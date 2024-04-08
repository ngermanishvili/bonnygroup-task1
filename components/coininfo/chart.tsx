"use client"

// LineChart.tsx
// LineChart.tsx
import React, { useEffect, useState } from 'react';
import Highcharts, { SeriesOptionsType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface Props {
    price: number;
    volume_24h: number;
    lastUpdated: string;
}

const LineChart: React.FC<Props> = ({ price, volume_24h, lastUpdated }) => {
    const [options, setOptions] = useState<Highcharts.Options>({
        chart: {
            zoomType: 'x'
        } as Highcharts.ChartOptions,
        title: {
            text: 'Price and Volume',
            align: 'left'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: [
            {
                title: {
                    text: 'Price'
                }
            },
            {
                title: {
                    text: 'Volume'
                },
                opposite: true
            }
        ],
        legend: {
            enabled: false
        },
        plotOptions: {
            line: {
                marker: {
                    radius: 4
                },
                lineWidth: 2,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                }
            }
        },
        series: [
            {
                type: 'line',
                name: 'Price',
                data: [], // Initialize with empty data
                yAxis: 0
            },
            {
                type: 'line',
                name: 'Volume',
                data: [], // Initialize with empty data
                yAxis: 1,
                lineWidth: 1,
                marker: {
                    enabled: false
                }
            }
        ]
    });

    useEffect(() => {
        const currentTime = new Date().getTime();
        const lastUpdatedTime = new Date(lastUpdated).getTime();
        const timeDiff = currentTime - lastUpdatedTime;

        // Adjust data points for the past 24 hours
        const priceData = [
            [currentTime - 86400000, price],
            [currentTime, price]
        ];

        setOptions((prevOptions) => ({
            ...prevOptions,
            series: [
                {
                    ...(prevOptions.series && prevOptions.series[0]),
                    data: timeDiff <= 86400000 ? priceData : [], // Show data for the past 24 hours
                    lineWidth: 2 // set lineWidth for Price series
                },
                {
                    ...(prevOptions.series && prevOptions.series[1]),
                    data: [
                        [currentTime, volume_24h]
                    ],
                    yAxis: 1,
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    }
                }
            ] as SeriesOptionsType[]
        }));
    }, [price, volume_24h, lastUpdated]);

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;