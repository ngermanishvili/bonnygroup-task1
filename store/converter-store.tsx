
import create from "zustand";

interface ConverterStore {
    baseCoin: string;
    compareCoin: string;
    baseCoinAmount: number;
    exchangeRate: number;
    setBaseCoin: (coin: string) => void;
    setCompareCoin: (coin: string) => void;
    setBaseCoinAmount: (amount: number) => void;
    setExchangeRate: (rate: number) => void;
}


const useConverterStore = create<ConverterStore>((set) => ({
    baseCoin: "",
    compareCoin: "",
    baseCoinAmount: 1,
    exchangeRate: 1,
    setBaseCoin: (coin) => set({ baseCoin: coin }),
    setCompareCoin: (coin) => set({ compareCoin: coin }),
    setBaseCoinAmount: (amount) => set({ baseCoinAmount: amount }),
    setExchangeRate: (rate) => set({ exchangeRate: rate }),
}));


export default useConverterStore;
