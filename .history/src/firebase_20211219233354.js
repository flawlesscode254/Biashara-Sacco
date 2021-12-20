import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAl4ZCx1yR7qnVniijfJX2C4ClScAzIKc8",

    authDomain: "biashara-sacco.firebaseapp.com",
  
    projectId: "biashara-sacco",
  
    storageBucket: "biashara-sacco.appspot.com",
  
    messagingSenderId: "614750631405",
  
    appId: "1:614750631405:web:27dab2ff76c12c8c4ca3e4"
    
  
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const store = firebase.storage();


export default db
export { store, auth }