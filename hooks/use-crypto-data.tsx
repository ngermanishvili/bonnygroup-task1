"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { CryptoDataType } from "@/types/crypto";

function useCryptoData() {
    const [cryptoData, setCryptoData] = useState<CryptoDataType | null>({ data: [] });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/api/coinmarket");
                setCryptoData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);

            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { cryptoData, loading, };
}

export default useCryptoData;
