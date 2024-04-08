"use client"
import Head from "next/head";
import { chartBuilder } from "scichart/Builder/chartBuilder";
import React from "react";
import { ESeriesType } from "scichart/types/SeriesType";

async function initSciChart() {
    const { sciChartSurface, wasmContext } = await chartBuilder.build2DChart("scichart-root", {
        series: {
            type: ESeriesType.LineSeries,
            xyData: {
                xValues: [1, 2, 3, 4],
                yValues: [1, 4, 2, 6]
            }
        }
    });
}

export default function Home() {
    React.useEffect(() => {
        console.log("testing");
        initSciChart();
    });

    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="title">
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>

                <div id="scichart-root" style={{ width: 600, height: 400 }}></div>
            </main>

        </div>
    );
}