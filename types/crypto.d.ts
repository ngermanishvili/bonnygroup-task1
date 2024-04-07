export interface CryptoDataType {
    [x: string]: any;
    id: any;
    data: CryptoData[];
}

export interface CryptoData {
    id: string;
    name: string;
    symbol: string;
    price: number;
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
