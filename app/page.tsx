"use client"

import React, { useEffect, useState } from 'react';
import CryptoTable from '@/components/landing/crypto-table';
import { HeroHighlightDemo } from '@/components/landing/hero';
import type { CryptoDataType } from '@/types/crypto';
import numeral from 'numeral';

export default function Cryptos() {
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
    return <div>Loading...</div>;
  }

  return (
    <div>


      <HeroHighlightDemo />
      <CryptoTable data={data} />
    </div>
  );
}
