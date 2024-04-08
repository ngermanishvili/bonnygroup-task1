"use client"
// app/info/id page
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import LineChart from '@/components/coininfo/chart';
import CandlestickChart from "@/components/candlestick/candlestick-chart";
import useCoinIdStore from '@/store/coinid-store';
import { CoinData } from '@/types/coins';




const CoinData2 = () => {
    const setCoinId = useCoinIdStore(state => state.setCoinId);
    const params = useParams();
    const [coinData, setCoinData] = useState<CoinData | null>(null);

    const id = (params.id as string).split('-')[0];

    const usdt = (params.id as string).split('-')[1];
    setCoinId(usdt);


    useEffect(() => {
        if (params.id) {
            fetch(`/api/prices/${params.id}`)
                .then(response => response.json())
                .then(data => {
                    const coin = data.data[params.id as keyof typeof data.data];
                    setCoinData(coin);

                    console.log('Fetched coin data:', coin);
                })
                .catch(error => console.error('Error fetching coin data:', error));
        }
    }, [params.id]);

    return (
        <div>
            <CandlestickChart />
        </div>
    );
}

export default CoinData2;