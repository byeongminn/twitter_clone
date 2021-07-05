import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDbHgYr8noOzqFjiKvRhAfFA9Laa1E2QZQ",
    authDomain: "nwitter-b86a2.firebaseapp.com",
    projectId: "nwitter-b86a2",
    storageBucket: "nwitter-b86a2.appspot.com",
    messagingSenderId: "894539991230",
    appId: "1:894539991230:web:efbf431ac492ca380f36ef"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();