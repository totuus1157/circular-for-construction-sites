// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACI7uHPvhwTE-ajRqZnnM35aGBDP2o3QE",
  authDomain: "circular-for-construction-site.firebaseapp.com",
  projectId: "circular-for-construction-site",
  storageBucket: "circular-for-construction-site.appspot.com",
  messagingSenderId: "427904359731",
  appId: "1:427904359731:web:9a5fd6b248ace8f91f7246",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { db, auth };
