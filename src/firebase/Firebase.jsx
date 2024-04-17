import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyArfalO_S4pTD8kG2vo4iZAG0LLUKOnQHA",
  authDomain: "monkeymonk-8d654.firebaseapp.com",
  projectId: "monkeymonk-8d654",
  storageBucket: "monkeymonk-8d654.appspot.com",
  messagingSenderId: "1047229573839",
  appId: "1:1047229573839:web:ec6ec594d218df419de5ba"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();
