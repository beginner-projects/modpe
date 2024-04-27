'use client'

import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import styles from './swap.module.css';
import Image from 'next/image';
import { useMetaMask } from '@/context/useMetaMask'
import Web3 from "web3";
import usdtABI from '@/lib/usdtABI.json'


function Swap() {
  const [tokenOneAmount, setTokenOneAmount] = useState<number>(0);
  const [tokenTwoAmount, setTokenTwoAmount] = useState<number>(0);
  const { wallet, isConnecting, connectMetaMask } = useMetaMask();
  const [ usdtBalance, setUsdtBalance ] = useState<string | null>('0');

  const tokenOne = {
    ticker: "USDT",
    name: "USDT Coin",
    address: "0x55d398326f99059ff775485246999027b3197955",
    decimals: 18
  };

  const tokenTwo = {
    ticker: "MRB",
    name: "MRB Coin",
    address: "0x514910771af9ca656af840dff83e8264ecf986ca",
    decimals: 18
  };


  function changeAmount(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (!isNaN(parseFloat(value))) {
      setTokenOneAmount(parseFloat(value));
      setTokenTwoAmount(parseFloat(value) / 0.001);
    } else {
      setTokenOneAmount(0);
      setTokenTwoAmount(0);
    }
  }

  const fetchTokenBalance = async (web3: Web3, tokenAddress: string, walletAddress: string, setUsdtBalance: React.Dispatch<React.SetStateAction<string | null>>) => {
    try {
      // Load token contract
      const tokenContract = new web3.eth.Contract(usdtABI, tokenAddress);
      // Call balanceOf function of the token contract
      const tokenBalanceScientific: string = await tokenContract.methods.balanceOf(walletAddress).call();
      const tokenBalanceDecimal: string = web3.utils.fromWei(tokenBalanceScientific, 'ether');
  
      setUsdtBalance(tokenBalanceDecimal);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {
    const fetchBalance = async () => {
      const web3 = new Web3(Web3.givenProvider || 'https://bsc-dataseed.binance.org/'); // Use Binance Smart Chain provider
      await fetchTokenBalance(web3, tokenOne.address, wallet.accounts[0], setUsdtBalance);
    };

    // Fetch balance initially
    fetchBalance();

    // Set up interval to fetch balance every 15 seconds
    const interval = setInterval(fetchBalance, 15000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [wallet, tokenOne.address]);

  useEffect(() => {
    if (isConnecting) {
      setTokenOneAmount(0);
      setTokenTwoAmount(0);
    }
  }, [isConnecting]);


  return (
    <div className={styles.tradeBox}>
      <div className={styles.tradeBoxHeader}>
        <h4 className="text-white pt-5 pb-3">Swap</h4>
        <p className="text-white"><span className="text-gray-400 mr-2">Balance :</span>{usdtBalance}<span className="text-gray-400 text-sm font-lighter ml-2">USDT</span></p>
      </div>
      <div className={styles.inputs}>
        <Input
          type="number"
          step="any"
          placeholder="00"
          value={tokenOneAmount || ''}
          onChange={changeAmount}
          className={styles.antInput}
        />
        <Input placeholder="00" value={tokenTwoAmount || ''} disabled={true} className={styles.antInput} />
        <div className={styles.switchButton}>
          <ArrowDownOutlined className={styles.switchArrow} />
        </div>
        <div className={styles.assetOne}>
          <Image src="/usdt.svg" alt="usdt logo" width={22} height={22} className={styles.assetLogo} />
          {tokenOne.ticker}
        </div>
        <div className={styles.assetTwo}>
          <Image src="/flame.svg" alt="mrb logo" width={22} height={22} className={styles.assetLogo} />
          {tokenTwo.ticker}
        </div>
      </div>



      {wallet.accounts.length ? (
        <div className={styles.swapButton}>
          Swap
        </div>
      ) : (
        <div className={styles.inactiveSwapButton} onClick={connectMetaMask}>
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </div>
      )}
    </div>
  );
}

export default Swap;


