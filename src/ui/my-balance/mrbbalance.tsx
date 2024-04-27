'use client'

import React, { useState, useEffect, useMemo } from 'react';
import Web3 from 'web3';
import mrabABI from '@/lib/bswABI.json'; // edit this
import styles from './balance.module.css';
import Link from 'next/link';
import { useMetaMask } from '@/context/useMetaMask';

const MrbBalance: React.FC = () => {
  const [usersNativeTokenBalance, setUsersNativeTokenBalance] = useState<string | null>('0');
  const { wallet } = useMetaMask();
  const nativeTokenAddress = '0x965F527D9159dCe6288a2219DB51fc6Eef120dD1';
  const web3 = useMemo(() => new Web3(Web3.givenProvider || 'https://bsc-dataseed.binance.org/'), []);



  const fetchTokenBalance = async (web3: Web3, tokenAddress: string, walletAddress: string) => {
    try {
      // Load token contract
      const tokenContract = new web3.eth.Contract(mrabABI, tokenAddress);
      // Call balanceOf function of the token contract
      const tokenBalanceScientific: string = await tokenContract.methods.balanceOf(walletAddress).call();
      const tokenBalanceDecimal: string = web3.utils.fromWei(tokenBalanceScientific, 'ether');
  
      setUsersNativeTokenBalance(tokenBalanceDecimal);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {
    const fetchBalance = async () => {
      if (wallet.accounts.length > 0) {
        await fetchTokenBalance(web3, nativeTokenAddress, wallet.accounts[0]);
      } else {
        setUsersNativeTokenBalance("0");
      }
    };

    // Fetch balance initially
    fetchBalance();

    // Set up interval to fetch balance every 15 seconds
    const interval = setInterval(fetchBalance, 15000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [wallet, nativeTokenAddress]);

  return (
    <div className={styles.container}>
      <div className={styles.containerSegment}>
        <div className={styles.segment}>
          <div>
            {usersNativeTokenBalance && parseFloat(usersNativeTokenBalance) < 0 ?
                `${usersNativeTokenBalance}` :
              <Link href="./main-home">
                <span className=" inline-flex items-center rounded-md bg-red-600 px-3 py-4 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  buy <span className="ml-1 mr-1"> MRB </span> now
                
                </span>
              </Link>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default MrbBalance;

