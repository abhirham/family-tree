// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBULtMmwRRceg0l9CBGMjzDMtjCy1l22Sk",
  authDomain: "family-tree-6af23.firebaseapp.com",
  projectId: "family-tree-6af23",
  storageBucket: "family-tree-6af23.appspot.com",
  messagingSenderId: "889815323859",
  appId: "1:889815323859:web:cd8b8ad08cdf39a435f026"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore();