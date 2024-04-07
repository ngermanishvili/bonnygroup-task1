export interface CryptoDataType {
    data: CryptoData[];
}

export interface CryptoData {
    id: string;
    name: string;
    symbol: string;
    quote: {
        USD: {
            price: number;
        };
    };
}
