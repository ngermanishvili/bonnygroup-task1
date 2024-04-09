"use client"
import React from 'react';
import CryptoTable from "@/components/table/crypto-table"
import { HeroHighlightDemo } from '@/components/landing/hero';
import LivePrice from '@/components/liveprice/page';
import CandlestickChart from '@/components/candlestick/candlestick-chart';
import useCryptoData from '@/hooks/use-landig-crypto-data';
import SpinComponent from '@/components/ui/spin-antd';

const Cryptos = () => {
  const cryptoData = useCryptoData();

  if (!cryptoData) {
    return <div className='flex justify-center items-center'>
      <SpinComponent />
    </div>;
  }

  return (
    <div>
      <HeroHighlightDemo />
      <div className='w-full p-20 rounded-sm'>
        <div className='m-4'>
          <LivePrice />
        </div>
        <CandlestickChart />
        <CryptoTable data={cryptoData} />
      </div>
    </div>
  );
}

export default Cryptos;
