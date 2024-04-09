// Assuming that the id in the CryptoDataType interface is optional
export interface CryptoDataType {
    id?: number;
    data: CryptoData[];
    symbol: string;
}

export interface CryptoData {
    id: string;
    name: string;
    symbol: string;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    market_cap: number;
    volume_24h: number;
    quote: {
        USD: {
            price: number;
        };
    };
}

const [cryptoData, setCryptoData] = useState<CryptoDataType>({ data: [] });
setCryptoData({ data: response.data });
setCryptoData({ id: 0, data: response.data });
