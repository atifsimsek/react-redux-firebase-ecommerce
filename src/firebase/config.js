import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "ecommerce-7571a.firebaseapp.com",
  projectId: "ecommerce-7571a",
  storageBucket: "ecommerce-7571a.appspot.com",
  messagingSenderId: "633432347479",
  appId: "1:633432347479:web:38aadd7dfbc831964aa412",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
