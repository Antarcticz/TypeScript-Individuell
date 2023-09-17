import 'firebase/auth'
import 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PID,
    storageBucket: process.env.REACT_APP_SB,
    messagingSenderId: process.env.REACT_APP_SID,
    appId: process.env.REACT_APP_APPID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export { db, app, auth, provider }