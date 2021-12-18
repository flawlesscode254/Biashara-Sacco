import create from "zustand"
import { auth } from "./firebase";

const [user] = useAuthState(auth);

const useStore = create(() => ({
    created: user
}))

export default useStore