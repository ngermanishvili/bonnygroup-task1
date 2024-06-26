import { NextResponse } from "next/server";

const apiKey = process.env.COINMARKETCAP_API_KEY as string;

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    try {
        const response = await fetch(
            `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${params.id}`,
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

        return new NextResponse(JSON.stringify(await response.json()));
    } catch (error) {
        console.error("[CRYPTO_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
