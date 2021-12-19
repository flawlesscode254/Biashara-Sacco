import create from "zustand";

const useStore = create((set) => ({
    openTab: "Request Loan",
    setOpenTab: (tab) => set(() => ({ openTab: tab }))
}))

export default useStore