"use client";
// app/info/id page
import CandlestickChart from "@/components/candlestick/candlestick-chart";
import { GlobeDemo } from '@/components/ui/globe-test';
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';
import { BadgeDelta, Card, Divider } from '@tremor/react';
import { motion } from "framer-motion";

import useCoinData from '@/hooks/use-custom-data';


const CoinData2 = () => {
    const coinData = useCoinData();
    return (
        <>
            <HeroHighlight className='mt-[80px]' >
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [20, -5, 0],
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                    className="text-2xl px-4 md:text-4xl lg:text-5xl uppercase font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
                >
                    {coinData?.name} <br />
                    <Highlight className="text-black dark:text-white uppercase">
                        Detailed informaton  <p className="uppercase">

                            {coinData?.quote.USD.last_updated ? new Date(coinData.quote.USD.last_updated).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit',
                                hour12: false
                            }) : 'N/A'}
                        </p>
                    </Highlight>
                </motion.h1>
            </HeroHighlight>
            <div className='mt-8 flex flex-col lg:flex-row justify-between p-4'>
                <Card className="mx-auto max-w-sm mb-4 lg:mb-0 lg:mr-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"> {coinData?.name} Price USDT</h4>
                        <BadgeDelta
                            deltaType={coinData?.quote.USD.percent_change_1h !== undefined && coinData.quote.USD.percent_change_1h < 0 ? "moderateDecrease" : "moderateIncrease"}
                            isIncreasePositive={true}
                            size="xs"
                        >
                            1h {' '} / {' '}
                            {coinData?.quote.USD.percent_change_1h.toLocaleString('en-US', { maximumFractionDigits: 2 })}  %
                        </BadgeDelta>
                    </div>
                    <Divider />
                    <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">${coinData?.quote.USD.price.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                    <p className="text-tremor-default uppercase text-tremor-content dark:text-dark-tremor-content mt-2">Num / MarketPairs {''}
                        {coinData?.num_market_pairs.toLocaleString('en-US', { maximumFractionDigits: 2 })}{''} $</p>
                    <p className="text-tremor-default uppercase text-tremor-content dark:text-dark-tremor-content mt-2 font-bold">circulating supply {""}{coinData?.circulating_supply.toLocaleString('en-US', { maximumFractionDigits: 2 })}{''} $</p>
                    <GlobeDemo />
                </Card>
                <Card className="mx-auto max-w-sm">
                    <div className="flex items-center justify-between">
                        <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Market Cap</h4>
                        <BadgeDelta
                            deltaType={coinData?.quote.USD.percent_change_1h !== undefined && coinData.quote.USD.percent_change_24h < 0 ? "moderateDecrease" : "moderateIncrease"}
                            isIncreasePositive={true}
                            size="xs"
                        >
                            24h {' '} / {' '}
                            {coinData?.quote.USD.market_cap.toLocaleString('en-US', { maximumFractionDigits: 4 }) ?? 0} %
                        </BadgeDelta>
                    </div>
                    <Divider />
                    <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">${coinData?.quote.USD.volume_24h.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                    <p className="text-tremor-default uppercase text-tremor-content dark:text-dark-tremor-content mt-2">Volume 24h / {''}{coinData?.quote.USD.volume_24h.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                    <p className="text-tremor-default uppercase text-tremor-content dark:text-dark-tremor-content font-bold mt-2">
                        Last Updated 24h / {' '}
                        {coinData?.quote.USD.last_updated ? new Date(coinData.quote.USD.last_updated).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            hour12: false // Use 24-hour format
                        }) : 'N/A'}
                    </p>
                    <GlobeDemo />
                </Card>
                <CandlestickChart />
            </div>
        </>
    );
}

export default CoinData2;
