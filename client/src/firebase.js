import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAY9ot4V_xi_Nxd-BmnTrgPCdyjA64__E0",
    authDomain: "practicelogginglf.firebaseapp.com",
    projectId: "practicelogginglf",
    storageBucket: "practicelogginglf.appspot.com",
    messagingSenderId: "1028509773955",
    appId: "1:1028509773955:web:6560ca87683e2e8e466bb6",
    measurementId: "G-EWVHYBHK18"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

