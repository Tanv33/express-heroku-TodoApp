import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCqifGo_f5hwguU7GS8c3qH5TAT1_E1nhA",
  authDomain: "todo-react-860c9.firebaseapp.com",
  projectId: "todo-react-860c9",
};
initializeApp(firebaseConfig);
export const db = getFirestore();