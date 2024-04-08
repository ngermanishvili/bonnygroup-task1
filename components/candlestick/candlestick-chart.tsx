"use client"

import React, { useEffect, useRef, useState } from "react";
import useCoinIdStore from "@/store/coinid-store";
import { drawExample } from "./scichart-initial";
import { FastCandlestickRenderableSeries, FastOhlcRenderableSeries, SciChartOverview, SciChartSurface } from "scichart";
import { simpleBinanceRestClient, appTheme } from "scichart-example-dependencies";
import classes from "@/styles/Examples.module.scss";

const divElementId = "chart";

const CandlestickChart = () => {
    const coinId = useCoinIdStore((state) => state.coinId);
    const sciChartSurfaceRef = useRef<SciChartSurface>();
    const sciChartOverviewRef = useRef<SciChartOverview>();
    const [candlestickChartSeries, setCandlestickChartSeries] = useState<FastCandlestickRenderableSeries>();
    const [ohlcChartSeries, setOhlcChartSeries] = useState<FastOhlcRenderableSeries>();
    const [priceBars, setPriceBars] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchPriceBars = async () => {
            try {
                const endDate = new Date(Date.now());
                const startDate = new Date();
                startDate.setHours(endDate.getHours() - 300);
                const response = await simpleBinanceRestClient.getCandles(coinId, "1h", startDate, endDate);
                setPriceBars(response);
                setLoading(false);
            } catch (error) {
                setError('Error fetching price bars');
                setLoading(false);
            }
        };

        fetchPriceBars();
    }, [coinId]);

    useEffect(() => {
        const chartInitializationPromise = drawExample(coinId).then(
            ({ sciChartSurface, candlestickSeries, ohlcSeries }) => {
                setCandlestickChartSeries(candlestickSeries);
                setOhlcChartSeries(ohlcSeries);
                sciChartSurfaceRef.current = sciChartSurface;
            }
        );
        return () => {
            // check if chart is already initialized
            if (sciChartSurfaceRef.current) {
                sciChartSurfaceRef.current?.delete();
                sciChartOverviewRef.current?.delete();
                sciChartSurfaceRef.current = undefined;
                sciChartOverviewRef.current = undefined;
                return;
            }

            // else postpone deletion
            chartInitializationPromise.then(() => {
                sciChartSurfaceRef.current?.delete();
                sciChartOverviewRef.current?.delete();
                sciChartSurfaceRef.current = undefined;
                sciChartOverviewRef.current = undefined;
            });
        };
    }, []);

    const idToCoinName: { [id: string]: string } = {
        "1": "BTCUSDT",
        "1027": "ETHUSDT",
        "1839": "BNBUSDT"
        // Add more mappings as needed
    };

    // Get the coin name corresponding to the provided coinId
    const coinName = idToCoinName[coinId];

    return (
        <React.Fragment>
            <div className={classes.FullHeightChartWrapper} style={{ background: appTheme.DarkIndigo }}>
                <div style={{ display: "flex", flexDirection: "column", height: "50vh", width: "100%", }}>
                    <div className="cursor-pointer" id={divElementId} style={{ flexBasis: "80%", flexGrow: 1, flexShrink: 1 }} />
                </div>
            </div>
        </React.Fragment>
    );
}

export default CandlestickChart;
