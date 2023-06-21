import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDrwEy7CucuTyoIxkjWiMgcELChHS6qVfw",
  authDomain: "to-do-list-83f67.firebaseapp.com",
  projectId: "to-do-list-83f67",
  storageBucket: "to-do-list-83f67.appspot.com",
  messagingSenderId: "595101546098",
  appId: "1:595101546098:web:d807e904e1e6bbfee9b4eb",
  measurementId: "G-2QEGX8E2T7",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
