import create from "zustand";

interface PriceBarsStore {
  selectedPriceBars: string; // Adjust the type according to your data structure
  setPriceBars: (priceBars: string) => void; // Adjust the type according to your data structure
}

const usePriceBarsStore = create<PriceBarsStore>((set) => ({
  selectedPriceBars: "",

  setPriceBars: (priceBars) => {
    set({selectedPriceBars: priceBars});
  },
}));

export default usePriceBarsStore;
