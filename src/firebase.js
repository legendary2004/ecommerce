// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_NPiipCoEqRldPd3yR27ogMKSZZ_x_q4",
  authDomain: "ecommerce-9e9cd.firebaseapp.com",
  projectId: "ecommerce-9e9cd",
  storageBucket: "ecommerce-9e9cd.appspot.com",
  messagingSenderId: "927914467062",
  appId: "1:927914467062:web:088cf32ee837a0b99216d7",
  measurementId: "G-QV8DDWER5T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();