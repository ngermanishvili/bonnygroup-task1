"use client"
import { useEffect, useState } from 'react';
import type { CryptoDataType } from '@/types/crypto';

const useCryptoData = () => {
    const [data, setData] = useState<CryptoDataType[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/coinmarket');
                if (!response.ok) {
                    throw new Error('Failed to fetch data from server');
                }
                const responseData = await response.json();
                setData(responseData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return data;
};

export default useCryptoData;
