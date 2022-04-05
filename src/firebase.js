import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCH4k_ZrOvOBFSAwPisEX_50LEu4K_U4DA",
  authDomain: "bishara-sacco.firebaseapp.com",
  projectId: "bishara-sacco",
  storageBucket: "bishara-sacco.appspot.com",
  messagingSenderId: "583079822937",
  appId: "1:583079822937:web:13b9d61ce0fe6e09f01348",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const store = firebase.storage();


export default db
export { store, auth }
