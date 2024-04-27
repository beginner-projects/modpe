'use client'

import React, { useState, useEffect } from 'react';
import styles from './timer.module.css';
import { usePool } from '@/context/PoolContext';
import axios from 'axios';

const TimerCountdown: React.FC = () => {
  const [timer, setTimer] = useState<number>(calculateRemainingTime());
  const [distributionAmount, setDistributionAmount] = useState<number>(0);
  const [messageSent, setMessageSent] = useState<boolean>(false); // State variable to track if the message has been sent
  const { balance } = usePool();
  const bovkaribotAPI = "6461074198:AAFnhXef_RhhrNl_qAVHqqchsVQCczEc1co";

  useEffect(() => {
    if (balance) {
      const balanceFloat = parseFloat(balance);
      const timerFinishedTimeToDistributePayoutAmount = ((balanceFloat * 0.03) * 100000000).toFixed(0);
      setDistributionAmount(parseFloat(timerFinishedTimeToDistributePayoutAmount));
    }
  }, [balance]);

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = calculateRemainingTime();
      setTimer(remainingTime);

      if (remainingTime === 0) {
        handleMidnightAction();
      } else if (remainingTime < 900 && !messageSent) {
        const currentDate = new Date().toLocaleString();
        const formattedBalance = balance ? parseFloat(balance).toFixed(8) : "N/A";
        sendTelegramMessage(`${currentDate}, \n${String(distributionAmount)} SATS, \n${formattedBalance} BTC`);
        setMessageSent(true); // Update messageSent state to true
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [distributionAmount, messageSent]); // Include distributionAmount and messageSent in the dependency array

  function calculateRemainingTime() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    let remainingTime = Math.floor((midnight.getTime() - now.getTime()) / 1000);
    if (remainingTime < 0) remainingTime = 0;
    return remainingTime;
  }

  const sendTelegramMessage = (message: string) => {
    axios.post(`https://api.telegram.org/bot${bovkaribotAPI}/sendMessage`, {
      chat_id: '1043285540',
      text: message
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  const formatTimer = (timer: number) => {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;

    return (
      <div>
        {(timer < 900) ?
          <div className={styles.container}>
            <div className={styles.containerSegment}>
              <div className={styles.segment}>
                <h2>Distributing ...</h2>
              </div>
            </div>
          </div>
          :
          <div className={styles.container}>
            <div className={styles.containerSegment}>
              <div className={styles.segment}>
                <div>{formatDigits(hours)}</div>
              </div>
            </div>
            <span className={styles.colon}>:</span>
            <div className={styles.containerSegment}>
              <div className={styles.segment}>
                <div>{formatDigits(minutes)}</div>
              </div>
            </div>
            <span className={styles.colon}>:</span>
            <div className={styles.containerSegment}>
              <div className={styles.segment}>
                <div>{formatDigits(seconds)}</div>
              </div>
            </div>
          </div>}
      </div>
    );
  };

  const formatDigits = (value: number) => {
    return value < 10 ? '0' + value : value.toString();
  };

  const handleMidnightAction = () => {
    restartTimerForNextDay();
  };

  const restartTimerForNextDay = () => {
    const now = new Date();
    const millisecondsUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0).getTime() - now.getTime();
    const remainingTimeInSeconds = Math.floor(millisecondsUntilMidnight / 1000);
    setTimer(remainingTimeInSeconds);
  };

  return formatTimer(timer);
};

export default TimerCountdown;



