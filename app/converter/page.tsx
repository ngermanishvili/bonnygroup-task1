"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import useConverterStore from "./converterStore"; // Import the Zustand store

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

interface ConverterProps {
  cryptoData: CryptoData;
}

const Converter: React.FC<ConverterProps> = ({ cryptoData }) => {
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

  const handleBaseCoinChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCoinId = e.target.value;

    const selectedCoin = cryptoData.data.find(
      (coin) => Number(coin.id) === Number(selectedCoinId)
    );
    if (selectedCoin) {
      setBaseCoin(selectedCoin.id);
    }
    if (selectedCoinId === compareCoin) {
      setCompareCoin("");
    }
    setBaseCoinAmount(1);
  };

  const handleCompareCoinChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCoinId = e.target.value;
    const selectedCoin = cryptoData.data.find(
      (coin) => Number(coin.id) === Number(selectedCoinId)
    );
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

  return (
    <div>
      <h1>Converter Calculator</h1>
      <div>
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a base coin" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Base Coin</SelectLabel>
              {cryptoData.data.map((coin) => (
                <SelectItem key={coin.id} value={coin.id} onClick={() => handleBaseCoinChange}>
                  {coin.name} ({coin.symbol})
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>COINS</SelectLabel>
              {cryptoData.data.map((coin) => (

                <SelectItem key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol})
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>



        <div className=" mt-10">
          <label className="" htmlFor="baseCoin">Base Coin:</label>
          {/* <select id="baseCoin" value={baseCoin} onChange={handleBaseCoinChange}>
            {cryptoData.data.map((coin) => (
              <option className="text-black font-md" key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol})
              </option>
            ))}
          </select> */}
          <br />
          <label htmlFor="compareCoin">Compare Coin:</label>
          <select
            id="compareCoin"
            value={compareCoin}
            onChange={handleCompareCoinChange}
          >
            {cryptoData.data.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol})
              </option>
            ))}
          </select>
        </div>
        <br />
        <label htmlFor="baseCoinAmount">Amount in Base Coin:</label>
        <input
          className="bg-red-400"
          type="number"
          id="baseCoinAmount"
          value={baseCoinAmount}
          onChange={(e) => setBaseCoinAmount(parseFloat(e.target.value))}
        />
        <br />
        <Button type="button">Convert</Button>
      </div>
      <p>
        {baseCoinAmount.toFixed(2)} {baseCoinData.symbol} is equal to{" "}
        {amountInCompareCoin.toFixed(2)} {compareCoinData.symbol}
      </p>
    </div >
  );
};
const ConverterPage: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData | null>({ data: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/coinmarket");
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return cryptoData ? (
    <Converter cryptoData={cryptoData} />
  ) : (
    <div>Loading...</div>
  );
};

export default ConverterPage;
