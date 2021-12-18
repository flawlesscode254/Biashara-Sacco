import create from "zustand"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";


const [user] = useAuthState(auth);

const useStore = create((set) => ({

}))