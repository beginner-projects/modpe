'use client'

import { usePool } from '@/context/PoolContext';
import styles from './pool.module.css';

const Pool: React.FC = () => {
  const { balance } = usePool();

  const formattedBalance = (balance: string | null) => {
    if (!balance) return null;

    // Convert balance to a number
    const balanceValue = parseFloat(balance);

    // Format the display value
    let formattedBalance: string;
    if (balanceValue <= 9) {
      formattedBalance = balanceValue.toFixed(8); // Always display 9 digits
    } else if (balanceValue >= 10 && balanceValue <= 99) {
      formattedBalance = balanceValue.toFixed(7); // Always display 9 digits with one decimal point
    } else if (balanceValue >= 100 && balanceValue <= 999) {
      formattedBalance = balanceValue.toFixed(6);
    } else if (balanceValue >= 1000 && balanceValue <= 9999) {
      formattedBalance = balanceValue.toFixed(5);
    } else {
      formattedBalance = balanceValue.toFixed(4);
    }

    // Split the formattedBalance into parts before and after the decimal point
    const [integerPart, decimalPart] = formattedBalance.split('.');

    return (
      <>
        <span>{integerPart}</span> <span className={styles.dot}>.</span>
        <span className={styles.smallDecimal}>{decimalPart}</span>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerSegment}>
        <div className={styles.segment}>
          <div>
            {formattedBalance(balance)} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pool;
