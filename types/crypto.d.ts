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

// Adjust your useState initialization to match the interface
const [cryptoData, setCryptoData] = useState<CryptoDataType>({ data: [] });

// Assuming you're not using the 'id' property in your application logic, you can ignore it
// when setting the state
setCryptoData({ data: response.data });

// Or if you need to assign a default value to the 'id' property
setCryptoData({ id: 0, data: response.data });
