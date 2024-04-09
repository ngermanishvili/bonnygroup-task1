"use client"
import { Button } from "@/components/ui/button";
import React, { useEffect, useMemo, useState } from "react";
import useConverterStore from "../../store/converter-store";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingOutlined, SwapOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface CryptoData {
    data: {
        id: string;
        name: string;
        symbol: string;
        quote: {
            USD: {
                price: number;
            };
        };
    }[];
}

//

interface ConverterProps {
    cryptoData: CryptoData;
}

export const Converter: React.FC<ConverterProps> = ({ cryptoData }) => {
    const {
        baseCoin,
        compareCoin,
        baseCoinAmount,
        exchangeRate,
        setBaseCoin,
        setCompareCoin,
        setBaseCoinAmount,
    } = useConverterStore((state) => ({
        baseCoin: state.baseCoin,
        compareCoin: state.compareCoin,
        baseCoinAmount: state.baseCoinAmount,
        exchangeRate: state.exchangeRate,
        setBaseCoin: state.setBaseCoin,
        setCompareCoin: state.setCompareCoin,
        setBaseCoinAmount: state.setBaseCoinAmount,
    }));


    const [isLoading, setIsLoading] = useState(false);

    // * Here we are setting the default base coin and compare coin to the first two coins in the list.
    useEffect(() => {
        if (cryptoData && cryptoData.data && cryptoData.data.length > 1) {
            setBaseCoin(cryptoData.data[0].id);
            setCompareCoin(cryptoData.data[1].id);
            setBaseCoinAmount(1);
        }
    }, [cryptoData, setBaseCoin, setCompareCoin, setBaseCoinAmount]);

    useEffect(() => {
        if (baseCoin && compareCoin && cryptoData) {
            const baseCoinIndex = cryptoData.data.findIndex(
                (coin) => coin.id === baseCoin
            );
            const compareCoinIndex = cryptoData.data.findIndex(
                (coin) => coin.id === compareCoin
            );

            if (baseCoinIndex !== -1 && compareCoinIndex !== -1) {
                const baseCoinData = cryptoData.data[baseCoinIndex];
                const compareCoinData = cryptoData.data[compareCoinIndex];
                const newExchangeRate =
                    baseCoinData.quote.USD.price / compareCoinData.quote.USD.price;
                useConverterStore.setState({ exchangeRate: newExchangeRate });
            }
        }
    }, [baseCoin, compareCoin, cryptoData]);




    // ? Base Coin Amount Function implementation
    const handleBaseCoinAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const newValue = inputValue !== '' ? parseFloat(inputValue) : 0;
        setBaseCoinAmount(newValue);
        setIsLoading(true);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [baseCoinAmount]);


    //? Basecoin Function
    const handleBaseCoinChange = (value: string) => {
        const selectedCoinId = value;
        const selectedCoin = cryptoData.data.find(
            (coin) => Number(coin.id) === Number(selectedCoinId)
        );
        if (selectedCoinId === compareCoin) {
            alert("Base coin cannot be the same as compare coin.");
            return
        }
        if (selectedCoin) {
            setBaseCoin(selectedCoin.id);
        }
        if (selectedCoinId === compareCoin) {
            setCompareCoin("");
        }
        setBaseCoinAmount(1);
    };
    // * Compare Coin Function
    const handleCompareCoinChange = (value: string) => {
        const selectedCoinId = value;
        const selectedCoin = cryptoData.data.find(
            (coin) => Number(coin.id) === Number(selectedCoinId)
        );
        if (selectedCoinId === baseCoin) {
            alert("Compare coin cannot be the same as base coin.");
            return
        }
        if (selectedCoin) {
            setCompareCoin(selectedCoin.id);
        }
        if (selectedCoinId === baseCoin) {
            setBaseCoin("");
        }
        setBaseCoinAmount(1);
    };



    if (!baseCoin || !compareCoin || !cryptoData) {
        return <div>Loading...</div>;
    }

    const baseCoinData = cryptoData.data.find((coin) => coin.id === baseCoin);
    const compareCoinData = cryptoData.data.find(
        (coin) => coin.id === compareCoin
    );

    if (!baseCoinData || !compareCoinData) {
        return <div>Data not available</div>;
    }

    const amountInCompareCoin = baseCoinAmount * exchangeRate;

    const handleSwap = () => {
        // Swap the values of baseCoin and compareCoin
        const tempCoin = baseCoin;
        setBaseCoin(compareCoin);
        setCompareCoin(tempCoin);
    };


    return (
        <div>
            <div>
                <div className=" w-[700px]">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="email">Amount in Base Coin:</Label>
                        <Input
                            value={baseCoinAmount.toString()}
                            onChange={handleBaseCoinAmountChange}
                            type="number"
                            id="baseCoinAmount"
                            placeholder="Enter the amount"
                        />
                    </div>
                    <div className="h-8">

                    </div>
                    <div className="flex gap-10">
                        <Select value={baseCoin} onValueChange={handleBaseCoinChange}>
                            <SelectTrigger className="w-[280px]">
                                <SelectValue placeholder="Select a base coin" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Base Coin</SelectLabel>
                                    {cryptoData.data.map((coin) => (
                                        <SelectItem key={coin.id} value={coin.id}>
                                            {coin.name} ({coin.symbol})
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button onClick={handleSwap} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <SwapOutlined />
                        </Button>

                        <Select value={compareCoin} onValueChange={handleCompareCoinChange}>
                            <SelectTrigger className="w-[280px]">
                                <SelectValue placeholder="Select a base coin" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Compare Coin</SelectLabel>
                                    {cryptoData.data.map((coin) => (
                                        <SelectItem key={coin.id} value={coin.id}>
                                            {coin.name} ({coin.symbol})
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className=" flex justify-center items-center">
                        <p className="mt-4">
                            {baseCoinAmount.toFixed(2)} {baseCoinData.name} ({baseCoinData.symbol}) = {" "}
                            {isLoading ? <LoadingOutlined className="mb-8" /> : (
                                <>
                                    {amountInCompareCoin.toFixed(8)} {compareCoinData.name} ({compareCoinData.symbol})
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
};