import React, { useState, useEffect } from "react";
import { Card, SparkAreaChart } from '@tremor/react';
import SpinComponent from "../ui/spin-antd";

const LivePrice = () => {
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

                ws.onerror = (error) => {
                    // console.error(`WebSocket error for ${symbol}: `, error);
                };
            });
            setTimeout(() => {
                setLoading(false);
            }, 5000);
        };

        fetchPrices(); // Fetch prices immediately

        const interval = setInterval(fetchPrices, 30000); // Fetch prices every 10 seconds

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
                    <h2 className="text-lg">BINANCE LIVE STREAM</h2>
                    <div className="flex">
                        {Object.entries(prices).map(([symbol, price]) => (
                            <Card key={symbol} className="sm:mx-auto sm:max-w-md flex gap-8 bg-black mt-8 text-white">
                                <p className="text-md text-red-500">
                                    ({symbol})
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

export default LivePrice;
