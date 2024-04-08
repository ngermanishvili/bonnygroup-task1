"use client"
import React, { useEffect, useState } from 'react';
import CryptoTable from '@/components/landing/crypto-table';
import { HeroHighlightDemo } from '@/components/landing/hero';
import type { CryptoDataType } from '@/types/crypto';
import LivePrice from '@/components/liveprice/page';
import CandlestickChart from '@/components/candlestick/candlestick-chart';
import ConverterPage from './converter/page';

const Cryptos = () => {
  const [data, setData] = useState<CryptoDataType[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/coinmarket');
        if (!response.ok) {
          throw new Error('Failed to fetch data from server');
        }
        const responseData = await response.json();
        setData(responseData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);





  if (!data) {
    return <div className='flex justify-center items-center'>
      loading
    </div>;
  }

  return (
    <div>

      <HeroHighlightDemo />
      <div className='flex justify-center items-center'>
        <ConverterPage />

      </div>
      <div className='w-full p-20 rounded-sm'>
        <div className='m-4'>
          <LivePrice />
        </div>
        <CandlestickChart />
        <CryptoTable data={data} />
      </div>


    </div>
  );
}

export default Cryptos;
