"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";

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

const IdPg = () => {
    const params = useParams();
    const [coinData, setCoinData] = useState<CoinData | null>(); // Specify the type or null

    useEffect(() => {
        if (params.id) {
            fetch(`/api/prices/${params.id}`)
                .then(response => response.json())
                .then(data => {
                    // Extract the coin data using params.id as the key
                    const coin = data.data[params.id as keyof typeof data.data];
                    setCoinData(coin);
                    console.log('Fetched coin data:', coin); // Log fetched data
                })
                .catch(error => console.error('Error fetching coin data:', error));
        }
    }, [params.id]);

    console.log(coinData);

    return (
        <div>
            <div>
                <p className='text-black'>
                    {coinData?.name}
                </p>
            </div>
        </div>
    );
}

export default IdPg;
