// types/coinTypes.ts

export interface Quote {
    USD: {
        price: number;
        volume_24h: number;
        percent_change_1h: number;
        percent_change_24h: number;
        percent_change_7d: number;
        percent_change_30d: number;
        percent_change_60d: number;
        percent_change_90d: number;
        market_cap: number;
        last_updated: string;
    };
}

export interface CoinData {
    id: string;
    name: string;
    symbol: string;
    slug: string;
    cmc_rank: number;
    num_market_pairs: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    last_updated: string;
    date_added: string;
    tags: string[];
    platform: string | null;
    quote: Quote;
}
