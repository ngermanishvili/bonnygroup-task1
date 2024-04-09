// Historical Prices API but not workin on free :/
import { NextResponse } from "next/server";
const apiKey = process.env.COINMARKETCAP_API_KEY as string;

export async function GET(req: Request, res: Response) {
    try {
        const response = await fetch(
            'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'X-CMC_PRO_API_KEY': apiKey,
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch data from CoinMarketCap API');
        }

        const responseData = await response.json();

        return new NextResponse(JSON.stringify(responseData));
    } catch (error) {
        console.error("[CRYPTO_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
