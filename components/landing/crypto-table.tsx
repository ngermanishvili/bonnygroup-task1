"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { SparkAreaChart } from '@tremor/react';

import { Table } from 'antd';
import type { TableProps } from 'antd';
import { CryptoDataType } from "@/types/crypto"



const chartdata = [
    {
        month: 'Jan 21',
        Performance: 4000,
    },
    {
        month: 'Feb 21',
        Performance: 3000,
    },
    {
        month: 'Mar 21',
        Performance: 2000,
    },

];


interface CryptoTableProps {
    data: CryptoDataType[];
}

const CryptoTable: React.FC<CryptoTableProps> = ({ data }) => {

    const router = useRouter();


    const handleRowClick = (record: CryptoDataType) => {
        router.push(`/info/${record.id}`);
    };

    const columns: TableProps<CryptoDataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: "id",
            dataIndex: "id",
            key: "id"
        },
        {
            title: 'Symbol',
            dataIndex: 'symbol',
            key: 'symbol',
        },
        {
            title: 'Price',
            dataIndex: 'quote',
            key: 'price',
            render: (quote) => `$${(quote.USD.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` //! regex to add commas to numbers for better readability

        },

        {
            title: '% Change (1h)',
            dataIndex: 'quote',
            key: 'percent_change_1h',
            render: (quote) => {
                const percentChange1h = quote.USD.percent_change_1h;
                const color = percentChange1h && percentChange1h > 0 ? 'green' : 'red';
                return <span style={{ color }}>{percentChange1h ? percentChange1h.toFixed(2) : '-'}%</span>;
            },
        },
        {
            title: '% Change (24h)',
            dataIndex: 'quote',
            key: 'percent_change_24h',
            render: (quote) => {
                const percentChange24h = quote.USD.percent_change_24h;
                const color = percentChange24h && percentChange24h > 0 ? 'green' : 'red';
                return <span style={{ color }}>{percentChange24h ? percentChange24h.toFixed(2) : '-'}%</span>;
            },
        },
        {
            title: '% Change (7d)',
            dataIndex: 'quote',
            key: 'percent_change_7d',
            render: (quote) => {
                const percentChange7d = quote.USD.percent_change_7d;
                const color = percentChange7d && percentChange7d > 0 ? 'green' : 'red';
                return <span style={{ color }}>{percentChange7d ? percentChange7d.toFixed(2) : '-'}%</span>;
            },
        },
        {
            title: 'Market Cap',
            dataIndex: 'quote',
            key: 'market_cap',
            render: (quote) => `$${quote.USD.market_cap.toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
        },
        {
            title: 'Volume (24h)',
            dataIndex: 'quote',
            key: 'volume_24h',
            render: (quote) => `$${quote.USD.volume_24h.toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
        },


        {
            title: 'Test',
            dataIndex: 'quote',
            key: 'test',
            render: (quote) => {
                const performanceData = chartdata.map(entry => ({ day: entry.month, Performance: entry.Performance * quote.USD.volume_24h / 100 }));
                const colors = quote.USD.volume_24h < 0 ? ['red'] : ['green'];
                return (
                    <SparkAreaChart
                        data={performanceData}
                        categories={['Performance']}
                        index={'month'}
                        colors={colors}
                        className="h-10 w-24"

                    />
                );
            },
        },
    ]

    return (
        <>
            <p className=" uppercase m-8 text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
            > List of <span className='relative inline-block pb-1   px-1 rounded-lg bg-gradient-to-r from-indigo-200 to-purple-400 dark:from-indigo-500 dark:to-purple-500'>Cryptocurrencies</span>
            </p>

            <Table
                rowKey={(record) => record.id?.toString() ?? ''}
                onRow={(record: CryptoDataType) => ({
                    onClick: () => handleRowClick(record),
                })}
                columns={columns}
                dataSource={data}
                style={{ backgroundColor: '#f0f0f0' }}

            />
        </>

    );
};

export default CryptoTable;
