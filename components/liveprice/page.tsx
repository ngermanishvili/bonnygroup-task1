import React, { useState, useEffect } from "react";

const LivePrice = () => {
    const [prices, setPrices] = useState<Record<string, string | null>>({});

    useEffect(() => {
        const symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "USDCUSDT", "XRPUSDT", "DOGEUSDT", "ADAUSDT", "TONUSDT"];

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
        };

        fetchPrices(); // Fetch prices immediately

        const interval = setInterval(fetchPrices, 10000); // Fetch prices every 10 seconds

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            {Object.entries(prices).map(([symbol, price]) => (
                <div key={symbol}>Live Price ({symbol}): {price}</div>
            ))}
        </div>
    );
};

export default LivePrice;
