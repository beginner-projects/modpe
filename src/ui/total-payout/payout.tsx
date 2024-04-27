'use client'

import React from 'react';
import styles from './payout.module.css';
import { usePool } from '@/context/PoolContext';

const Payout: React.FC = () => {
  const { balance } = usePool();

  let nextPayoutAmount: string = '0';

  if (balance) {
    const balanceFloat = parseFloat(balance);
    nextPayoutAmount = ((balanceFloat * 0.03)*100000000).toFixed(0);
  }

  // Replace 'sats' with 'btc' if balance is greater than or equal to 1
  const displayUnit = nextPayoutAmount && parseFloat(nextPayoutAmount) < 1 ? 'BTC' : 'SATS';


  return (
    <div className={styles.container}>
      <div className={styles.containerSegment}>
        <div className={styles.segment}>
          <div>
            {nextPayoutAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <span className="text-sm font-bold">{displayUnit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payout;



