import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAbq0BKhhzj8RymXf1CIIQ_JpirQhckRBk",

    authDomain: "loaning-system-v1.firebaseapp.com",
  
    projectId: "loaning-system-v1",
  
    storageBucket: "loaning-system-v1.appspot.com",
  
    messagingSenderId: "524165332894",
  
    appId: "1:524165332894:web:f5824cac02c8234402208f"  
  
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const store = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider()


export default db
export { store, auth, provider }