"use client"
// app/info/id page
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import LineChart from '@/components/coininfo/chart';
import CandlestickChart from '@/app/test/page';

interface CoinData {
    id: string;
    name: string;
    symbol: string;
    slug: string;
    cmc_rank: number;
    num_market_pairs: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    last_updated: string;
    date_added: string;
    tags: string[];
    platform: string | null;
    quote: {
        USD: {
            price: number;
            volume_24h: number;
            percent_change_1h: number;
            percent_change_24h: number;
            percent_change_7d: number;
            percent_change_30d: number;
            percent_change_60d: number;
            percent_change_90d: number;
            market_cap: number;
            last_updated: string;
        };
    };
}

const CoinData2 = () => {
    const params = useParams();
    const [coinData, setCoinData] = useState<CoinData | null>(null);

    const id = (params.id as string).split('-')[0];

    const usdt = (params.id as string).split('-')[1];


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
            <CandlestickChart coinId={usdt} />
        </div>
    );
}

export default CoinData2;