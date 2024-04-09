"use client"
// app/info/id page
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import CandlestickChart from "@/components/candlestick/candlestick-chart";
import useCoinIdStore from '@/store/coinid-store';
import { CoinData } from '@/types/coins';
import { Globe } from '@/components/ui/globe';




const CoinData2 = () => {
    const setCoinId = useCoinIdStore(state => state.setCoinId);
    const params = useParams();
    const [coinData, setCoinData] = useState<CoinData | null>(null);


    const usdt = (params.id as string).split('-')[1];
    setCoinId(usdt);


    useEffect(() => {
        if (params.id) {
            const id = (params.id as string).split('-')[0];
            console.log("es aris id", typeof id)

            fetch(`/api/prices/${id}`)
                .then(response => response.json())
                .then(data => {
                    const coin = data.data[id as keyof typeof data.data];
                    setCoinData(coin);

                    console.log('Fetched coin data:', coin);
                })
                .catch(error => console.error('Error fetching coin data:', error));
        }
    }, [params.id]);

    return (
        <div className='mt-8'>
            {coinData?.name} {coinData?.quote.USD.price} {coinData?.quote.USD.percent_change_24h}
            <CandlestickChart />
        </div>
    );
}

export default CoinData2;