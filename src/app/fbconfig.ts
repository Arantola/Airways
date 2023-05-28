import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDOFah9UDRXbA-IXso5DGC6D5WmVzT7xmU",
  authDomain: "airways-c7c03.firebaseapp.com",
  projectId: "airways-c7c03",
  storageBucket: "airways-c7c03.appspot.com",
  messagingSenderId: "388754986816",
  appId: "1:388754986816:web:a42b0fa3becb0b86554ca5",
  measurementId: "G-N5S8VEGY17"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
