// Detta är en modul jag skapade för att kunna kontakta firebase. 

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// Import the functions you need from the SDKs you need
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLlegtyakCISZWCZdsldSQlhkZEgj47zw",
    authDomain: "de-ve-de-18e95.firebaseapp.com",
    projectId: "de-ve-de-18e95",
    storageBucket: "de-ve-de-18e95.appspot.com",
    messagingSenderId: "879888740604",
    appId: "1:879888740604:web:690bb5e1a4834bd9f66779"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, addDoc, deleteDoc, doc, query, where }