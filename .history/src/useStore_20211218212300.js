import create from "zustand";

const useStore = create((set) => ({
    openTab: "Request Loan",
    setOpenTab: (tab) => set((state) => ({ openTab: state. }))
}))