import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import useCoinIdStore from '@/store/coinid-store';
import { CoinData } from '@/types/coins';

const useCoinData = () => {
    const setCoinId = useCoinIdStore(state => state.setCoinId);
    const params = useParams();
    const [coinData, setCoinData] = useState<CoinData | null>(null);

    const usdt = (params.id as string).split('-')[1];
    setCoinId(usdt);

    useEffect(() => {
        if (params.id) {
            const id = (params.id as string).split('-')[0];
            console.log("es aris id", typeof id);

            fetch(`/api/prices/${id}`)
                .then(response => response.json())
                .then(data => {
                    const coin = data.data[id as keyof typeof data.data];
                    setCoinData(coin);
                    console.log('Fetched coin data:', coin);
                })
                .catch(error => console.error('Error fetching coin data:', error));
        }
    }, [params.id]);


    return coinData;
};

export default useCoinData;
