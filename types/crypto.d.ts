export interface CryptoDataType {
    id: string;
    name: string;
    symbol: string;
    quote: {
        USD: {
            price: number;
        };
    };
}
