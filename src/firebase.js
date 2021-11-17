import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAGSoMwtlv7Jh8H-GwCKqfZOdnul-7SuXQ",

    authDomain: "money-disbursion.firebaseapp.com",
  
    projectId: "money-disbursion",
  
    storageBucket: "money-disbursion.appspot.com",
  
    messagingSenderId: "194461712693",
  
    appId: "1:194461712693:web:c72ca3d859a14f4fe5cc7c"
  
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const store = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider()


export default db
export { store, auth, provider }