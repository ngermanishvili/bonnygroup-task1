//coinmarket/route.ts
import { NextResponse } from "next/server";
const apiKey = '0a794595-fb8c-461c-84f1-50433b7a8052'; // IT'S TECHNICAL SO NO ENV :  )

export async function GET(req: Request, res: Response) {
    try {
        const response = await fetch(
            'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
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
