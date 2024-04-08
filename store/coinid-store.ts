import create from 'zustand';

interface CoinIdStore {
    coinId: any;
    setCoinId: (coinId: any) => void;
}

// Create a Zustand store
const useCoinIdStore = create<CoinIdStore>((set) => ({
    // Initial state
    coinId: "BTCUSDT",
    // Method to set the coinId
    setCoinId: (coinId) => set({ coinId }),
}));

export default useCoinIdStore;
