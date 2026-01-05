import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANViRxPuziNjIw_jmw6ZPSx_LbyAESndI",
  authDomain: "boda-sara-y-pablo.firebaseapp.com",
  projectId: "boda-sara-y-pablo",
  storageBucket: "boda-sara-y-pablo.firebasestorage.app",
  messagingSenderId: "354372649878",
  appId: "1:354372649878:web:151b4a66fb3223394b13b7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
