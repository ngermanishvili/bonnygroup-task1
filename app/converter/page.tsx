"use client"
import React from "react";
import { Converter } from "@/components/converter";
import useCryptoData from "@/hooks/use-crypto-data";
import SpinComponent from "@/components/ui/spin-antd";

const ConverterPage: React.FC = () => {
  const { cryptoData, loading } = useCryptoData();

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <SpinComponent />
      </div>
    );
  }

  if (!cryptoData) {
    return <div>No data available</div>;
  }

  return <Converter cryptoData={cryptoData} />;
};

export default ConverterPage;

