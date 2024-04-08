"use client"

import React, { useState, useEffect, useRef } from "react";


import {
    SciChartSurface,
    NumberRange,
    NumericAxis,
    OhlcDataSeries,
    FastCandlestickRenderableSeries,
    ZoomPanModifier,
    ZoomExtentsModifier,
    MouseWheelZoomModifier,
    ENumericFormat,
    DateTimeNumericAxis,
    EAutoRange,
    FastLineRenderableSeries,
    XyMovingAverageFilter,

    SciChartOverview,
    CursorModifier,
    CursorTooltipSvgAnnotation,
    SeriesInfo,
    EDataSeriesType,

    IRenderableSeries,

    OhlcSeriesInfo,
    FastColumnRenderableSeries,
    XyDataSeries,
    EFillPaletteMode,
    IFillPaletteProvider,
    IPointMetadata,
    parseColorToUIntArgb,
    FastOhlcRenderableSeries
} from "scichart";
import { appTheme, simpleBinanceRestClient } from "scichart-example-dependencies";
import classes from "../styles/Examples.module.css";


const divElementId = "chart";
// const divOverviewId = "overview";
const Y_AXIS_VOLUME_ID = "Y_AXIS_VOLUME_ID";

// SCICHART EXAMPLE

const drawExample = async (coinId: any) => {
    // Create a SciChartSurface

    const { sciChartSurface, wasmContext } = await SciChartSurface.create(divElementId, {
        theme: appTheme.SciChartJsTheme
    });
    SciChartSurface.setRuntimeLicenseKey("eBa35A+HZv+qvOVFtBmDmE432TXQeAvqSBHnf2qTTYh1RpcOzEXvvsAWDK2wmufFLOV65OEulZhr12Z4XurdfSDBw9aY8uUp8VGu/dTw8oPqPmhO2BUfaP9G/NDvjzoAtVsvddWc7pblOUWWJRLFnXy6V0oAPrNFbYjcCIpcDR+s0OD56aeETczJXU9L6DokC5H2unxvGggulkhzjotcLpPezBF8rtwZNrBvX8+4NOK5fRPaxOYNFrHqWR6VDfh6NuDsSlLOPb0peTNl2k3GiRPfgY1PulN61qZODsi0RTeRM0EC1pmhQ7y8rFyQ0ckWLRAocGHUWH9qFs2UYVjI647FMtbyGi3TPLkAi7vKFuakqccdiwaMCdqHP1p6M1ryr86siGBARxRuLIeEG2Yl2okfRaOrwyEoo8Xf6GdArutb3ijDcaGvCI2Xkeo8GESWqzbwtGnMlyaXUvN7JFAw8ETM9vC2O7Zfido4gXKPZXFvD6ukACO3V38wj0+YWIED0GSRye6cmijramKSvG4jVsG5sKp9k07oxUcTfn11IVj7xa4gG1KuPE3NbkLVyPEPmAX5zr8eY42vZP3/K4vaLa49l7fdWbgaJ/ULuPMhxAJGb36pL6xESvnSUbvwqxnek3eO4/9slnkv4NCmYYZw7VvVFFu06TFUo+IDqL1/t4+vGO3YhQ==");




    function updateChartWithData(priceBars: import("scichart-example-dependencies").TPriceBar[]) {
        if (!priceBars || priceBars.length === 0) return;

        // Extract data from priceBars and update the chart
        const xValues: number[] = [];
        const openValues: number[] = [];
        const highValues: number[] = [];
        const lowValues: number[] = [];
        const closeValues: number[] = [];
        const volumeValues: number[] = [];
        priceBars.forEach((priceBar) => {
            xValues.push(priceBar.date);
            openValues.push(priceBar.open);
            highValues.push(priceBar.high);
            lowValues.push(priceBar.low);
            closeValues.push(priceBar.close);
            volumeValues.push(priceBar.volume);
        });

        // Clear existing data in candleDataSeries
        candleDataSeries.clear();

        // Append new data to candleDataSeries
        for (let i = 0; i < priceBars.length; i++) {
            candleDataSeries.append(
                priceBars[i].date,
                priceBars[i].open,
                priceBars[i].high,
                priceBars[i].low,
                priceBars[i].close
            );
        }

        // ? Update the chart's visible range if necessary

        // ? Call invalidateElement to redraw the chart
        sciChartSurface.invalidateElement();
    }


    const xAxis = new DateTimeNumericAxis(wasmContext, {
        autoRange: EAutoRange.Never
    });
    sciChartSurface.xAxes.add(xAxis);

    // Create a NumericAxis on the YAxis with 2 Decimal Places
    sciChartSurface.yAxes.add(
        new NumericAxis(wasmContext, {
            growBy: new NumberRange(0.1, 0.1),
            labelFormat: ENumericFormat.Decimal,
            labelPrecision: 2,
            labelPrefix: "$",
            autoRange: EAutoRange.Always
        })
    );

    // Create a secondary YAxis to host volume data on its own scale
    sciChartSurface.yAxes.add(
        new NumericAxis(wasmContext, {
            id: Y_AXIS_VOLUME_ID,
            growBy: new NumberRange(0, 4),
            isVisible: false,
            autoRange: EAutoRange.Always
        })
    );

    // Fetch data from now to 300 1hr candles ago
    // Fetch data from now to 300 1hr candles ago
    const endDate = new Date(Date.now());
    const startDate = new Date();
    startDate.setHours(endDate.getHours() - 300);

    // Fetch initial data for DOGE
    const priceBars = await simpleBinanceRestClient.getCandles(coinId, "1h", startDate, endDate);

    const dogePriceBars = await simpleBinanceRestClient.getCandles("DOGEUSDT", "1h", startDate, endDate);

    // Fetch data for Bitcoin
    const btcPriceBars = await simpleBinanceRestClient.getCandles("BTCUSDT", "1h", startDate, endDate);

    // Fetch data for Ethereum
    const ethPriceBars = await simpleBinanceRestClient.getCandles("ETHUSDT", "1h", startDate, endDate);

    // Maps PriceBar { date, open, high, low, close, volume } to structure-of-arrays expected by scichart
    const xValues: number[] = [];
    const openValues: number[] = [];
    const highValues: number[] = [];
    const lowValues: number[] = [];
    const closeValues: number[] = [];
    const volumeValues: number[] = [];
    priceBars.forEach((priceBar: any) => {

        xValues.push(priceBar.date);
        openValues.push(priceBar.open);
        highValues.push(priceBar.high);
        lowValues.push(priceBar.low);
        closeValues.push(priceBar.close);
        volumeValues.push(priceBar.volume);
    });

    // Zoom to the latest 100 candles
    const startViewportRange = new Date();
    startViewportRange.setHours(startDate.getHours() - 100);
    xAxis.visibleRange = new NumberRange(startViewportRange.getTime() / 1000, endDate.getTime() / 1000);

    // Create and add the Candlestick series
    // The Candlestick Series requires a special dataseries type called OhlcDataSeries with o,h,l,c and date values
    // const dataSeriesName = `${coinId.toUpperCase()}/`;

    const candleDataSeries = new OhlcDataSeries(wasmContext, {
        xValues,
        openValues,
        highValues,
        lowValues,
        closeValues,
        dataSeriesName: "Price Series"

    });

    updateChartWithData(priceBars);

    const candlestickSeries = new FastCandlestickRenderableSeries(wasmContext, {
        dataSeries: candleDataSeries,
        stroke: appTheme.ForegroundColor, // used by cursorModifier below
        strokeThickness: 1,
        brushUp: appTheme.VividGreen + "77",
        brushDown: appTheme.MutedRed + "77",
        strokeUp: appTheme.VividGreen,
        strokeDown: appTheme.MutedRed
    });
    sciChartSurface.renderableSeries.add(candlestickSeries);

    // Add an Ohlcseries. this will be invisible to begin with
    const ohlcSeries = new FastOhlcRenderableSeries(wasmContext, {
        dataSeries: candleDataSeries,
        stroke: appTheme.ForegroundColor, // used by cursorModifier below
        strokeThickness: 1,
        dataPointWidth: 0.9,
        strokeUp: appTheme.VividGreen,
        strokeDown: appTheme.MutedRed,
        isVisible: false
    });
    sciChartSurface.renderableSeries.add(ohlcSeries);

    // Add some moving averages using SciChart's filters/transforms API
    // when candleDataSeries updates, XyMovingAverageFilter automatically recomputes
    sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, {
            dataSeries: new XyMovingAverageFilter(candleDataSeries, {
                dataSeriesName: "Moving Average (20)",
                length: 20
            }),
            stroke: appTheme.VividSkyBlue
        })
    );

    sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, {
            dataSeries: new XyMovingAverageFilter(candleDataSeries, {
                dataSeriesName: "Moving Average (50)",
                length: 50
            }),
            stroke: appTheme.VividPink
        })
    );

    // Add volume data onto the chart
    sciChartSurface.renderableSeries.add(
        new FastColumnRenderableSeries(wasmContext, {
            dataSeries: new XyDataSeries(wasmContext, { xValues, yValues: volumeValues, dataSeriesName: "Volume" }),
            strokeThickness: 0,
            // This is how we get volume to scale - on a hidden YAxis
            yAxisId: Y_AXIS_VOLUME_ID,
            // This is how we colour volume bars red or green
            paletteProvider: new VolumePaletteProvider(
                candleDataSeries,
                appTheme.VividGreen + "77",
                appTheme.MutedRed + "77"
            )
        })
    );

    // Optional: Add some interactivity modifiers
    sciChartSurface.chartModifiers.add(
        new ZoomExtentsModifier(),
        new ZoomPanModifier(),
        new MouseWheelZoomModifier(),
        new CursorModifier({
            crosshairStroke: appTheme.VividOrange,
            axisLabelFill: appTheme.VividOrange,
            tooltipLegendTemplate: getTooltipLegendTemplate
        })
    );
    return {
        sciChartSurface, candlestickSeries, ohlcSeries, updateChartWithData
    };
};



// Override the standard tooltip displayed by CursorModifier
const getTooltipLegendTemplate = (seriesInfos: SeriesInfo[], svgAnnotation: CursorTooltipSvgAnnotation) => {
    let outputSvgString = "";
    seriesInfos.forEach((seriesInfo, index) => {
        const y = 20 + index * 20;
        const textColor = seriesInfo.stroke;
        let legendText = seriesInfo.formattedYValue;
        if (seriesInfo.dataSeriesType === EDataSeriesType.Ohlc) {
            const o = seriesInfo as OhlcSeriesInfo;
            legendText = `Open=${o.formattedOpenValue} High=${o.formattedHighValue} Low=${o.formattedLowValue} Close=${o.formattedCloseValue}`;
        }
        outputSvgString += `<text x="8" y="${y}" font-size="13" font-family="Verdana" fill="${textColor}">
            ${seriesInfo.seriesName}: ${legendText}
        </text>`;
    });

    return `<svg width="100%" height="100%">
                ${outputSvgString}
            </svg>`;
};

class VolumePaletteProvider implements IFillPaletteProvider {
    fillPaletteMode: EFillPaletteMode = EFillPaletteMode.SOLID;
    private ohlcDataSeries: OhlcDataSeries;
    private upColorArgb: number;
    private downColorArgb: number;

    constructor(masterData: OhlcDataSeries, upColor: string, downColor: string) {
        this.upColorArgb = parseColorToUIntArgb(upColor);
        this.downColorArgb = parseColorToUIntArgb(downColor);
        this.ohlcDataSeries = masterData;
    }
    onAttached(parentSeries: IRenderableSeries): void { }
    onDetached(): void { }

    overrideFillArgb(
        xValue: number,
        yValue: number,
        index: number,
        opacity?: number,
        metadata?: IPointMetadata
    ): number {
        const isUpCandle =
            this.ohlcDataSeries.getNativeOpenValues().get(index) >=
            this.ohlcDataSeries.getNativeCloseValues().get(index);
        return isUpCandle ? this.upColorArgb : this.downColorArgb;
    }

    overrideStrokeArgb(
        xValue: number,
        yValue: number,
        index: number,
        opacity?: number,
        metadata?: IPointMetadata
    ): number {
        return this.overrideFillArgb(xValue, yValue, index, opacity, metadata);
    }
}

// React component needed as our examples app is react.
export const CandlestickChart = ({ coinId }: { coinId: any }) => {
    const sciChartSurfaceRef = React.useRef<SciChartSurface>();
    const sciChartOverviewRef = React.useRef<SciChartOverview>();
    const [candlestickChartSeries, setCandlestickChartSeries] = React.useState<FastCandlestickRenderableSeries>();
    const [ohlcChartSeries, setOhlcChartSeries] = React.useState<FastOhlcRenderableSeries>();


    const [priceBars, setPriceBars] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>('');

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


    React.useEffect(() => {
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