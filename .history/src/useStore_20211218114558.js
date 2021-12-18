import create from "zustand"
import { auth } from "./firebase";

const useStore = create(() => ({
    created: auth
}))

export default useStore