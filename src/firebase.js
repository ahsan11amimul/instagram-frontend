// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
// import * as firebase from "firebase/app";

// // If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// // Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";
// import 'firebase/storage';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDMwpa2dBU-kw5JNk5Qkf_Kg5-e2m2iEW8",
    authDomain: "instagram-clone-69f2c.firebaseapp.com",
    databaseURL: "https://instagram-clone-69f2c.firebaseio.com",
    projectId: "instagram-clone-69f2c",
    storageBucket: "instagram-clone-69f2c.appspot.com",
    messagingSenderId: "871988469254",
    appId: "1:871988469254:web:dd9812529e88ac5f146d87",
    measurementId: "G-0Q7GK25C2F"
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };