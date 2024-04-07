import React, { useState, useEffect } from "react";
import { Card, SparkAreaChart } from '@tremor/react';

const LivePrice = () => {
    const [prices, setPrices] = useState({});

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
                    console.error(`WebSocket error for ${symbol}: `, error);
                };
            });
        };

        fetchPrices(); // Fetch prices immediately

        const interval = setInterval(fetchPrices, 50000); // Fetch prices every 10 seconds

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <h2 className="text-lg  ">BINANCE LIVE STREAM </h2>

            <div className="flex">
                {Object.entries(prices).map(([symbol, price]) => (
                    <Card key={symbol} className="sm:mx-auto sm:max-w-md flex gap-8 bg-black mt-8 text-white ">
                        <p className="text-md text-red-500">
                            ({symbol})
                        </p>
                        <p className="text-md text-lime-500">
                            {String(price)}{""}$
                        </p>
                    </Card>

                ))}
            </div>
        </>
    );
};

export default LivePrice;
