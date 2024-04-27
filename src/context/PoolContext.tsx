'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Web3 from 'web3';
import btcbABI from '@/lib/btcbABI.json'; // Import ABI file

interface PoolContextType {
  balance: string | null;
  
}

const PoolContext = createContext<PoolContextType>({ balance: null });

export const usePool = () => useContext(PoolContext);

interface PoolProviderProps {
  children: ReactNode;
}

const fetchTokenBalance = async (web3: Web3, tokenAddress: string, walletAddress: string, setBalance: React.Dispatch<React.SetStateAction<string | null>>) => {
  try {
    // Load token contract
    const tokenContract = new web3.eth.Contract(btcbABI, tokenAddress);
    // Call balanceOf function of the token contract
    const tokenBalanceScientific: string = await tokenContract.methods.balanceOf(walletAddress).call();
    const tokenBalanceDecimal: string = web3.utils.fromWei(tokenBalanceScientific, 'ether');

    setBalance(tokenBalanceDecimal);
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
};

export const PoolProvider: React.FC<PoolProviderProps> = ({ children }) => {
  const [balance, setBalance] = useState<string | null>(null);
  const [nextPayoutAmount, setNextPayoutAmount] = useState<string>('0'); // State for nextPayoutAmount
  
  const walletAddress = '0x1eED63EfBA5f81D95bfe37d82C8E736b974F477b'; // Replace 'YOUR_WALLET_ADDRESS' with your actual wallet address
  const tokenAddress = '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c'; // Replace 'YOUR_TOKEN_ADDRESS' with the actual token address

  useEffect(() => {
    const fetchBalance = async () => {
      const web3 = new Web3(Web3.givenProvider || 'https://bsc-dataseed.binance.org/'); // Use Binance Smart Chain provider
      await fetchTokenBalance(web3, tokenAddress, walletAddress, setBalance);
    };

    // Fetch balance initially
    fetchBalance();

    // Set up interval to fetch balance every 15 seconds
    const interval = setInterval(fetchBalance, 15000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [walletAddress, tokenAddress]);

  
  
  

  return (
    <PoolContext.Provider value={{ balance }}>
      {children}
    </PoolContext.Provider>
  );
};
