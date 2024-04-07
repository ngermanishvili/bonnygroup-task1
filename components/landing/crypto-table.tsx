"use client"
import React from 'react';
import { Table } from 'antd';
import { useRouter } from 'next/navigation';
import type { TableProps } from 'antd';
import { CryptoDataType } from "@/types/crypto"
import numeral from 'numeral';

interface CryptoTableProps {
    data: CryptoDataType[];
}

const CryptoTable: React.FC<CryptoTableProps> = ({ data }) => {
    const router = useRouter();


    const handleRowClick = (record: CryptoDataType) => {
        router.push('/test');
    };

    const columns: TableProps<CryptoDataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
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
    ];

    return (
        <Table
            rowKey={(record) => record.id?.toString() ?? ''}
            // onRow={(record: CryptoDataType) => ({
            //     onClick: () => handleRowClick(record),
            // })}
            columns={columns}
            dataSource={data}
            style={{ backgroundColor: '#f0f0f0' }} // Change background color as needed

        />

    );
};

export default CryptoTable;
