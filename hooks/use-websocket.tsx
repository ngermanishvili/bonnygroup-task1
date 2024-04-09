"use client"

import React, { useState, useEffect } from "react";
import { Card } from '@tremor/react';
import SpinComponent from "@/components/ui/spin-antd";

const UseWsForLive = () => {
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "DOGEUSDT",];
        const fetchPrices = () => {
            symbols.forEach(symbol => {
                const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`);
                ws.onopen = () => {
                    console.log(`WebSocket connected for ${symbol}`);
                };

                ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    setPrices(prevPrices => ({
                        ...prevPrices,
                        [symbol]: data.p
                    }));
                };
            });
            setTimeout(() => {
                setLoading(false);
            }, 5000);
        };

        fetchPrices();
        const interval = setInterval(fetchPrices, 30000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            {loading ? (
                <div className="flex justify-center justify-items-center">
                    <h2 className="text-md">Live Data Loading ...</h2>
                    <SpinComponent />
                </div>
            ) : (
                <>
                    <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex justify-center items-center text-md uppercase">  Binance API Socket LIVE</h4>
                    <div className="flex flex-col sm:flex-row">
                        {Object.entries(prices).map(([symbol, price]) => (
                            <Card key={symbol} className="sm:mx-auto sm:max-w-sm flex gap-2 bg-blue-800 mt-8">
                                <h4 className="text-tremor-default text-white uppercase">         ({symbol}) </h4>
                                <p className="text-md text-red-500">
                                </p>
                                <p className="text-md text-lime-500">
                                    {String(price)}$
                                </p>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default UseWsForLive;
