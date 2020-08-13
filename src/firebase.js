import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAqgf-mUw0tHPGBgvwupeOdcs0o4CTtcqQ",
    authDomain: "st-burger-builder.firebaseapp.com",
    databaseURL: "https://st-burger-builder.firebaseio.com",
    projectId: "st-burger-builder",
    storageBucket: "st-burger-builder.appspot.com",
    messagingSenderId: "581939399647",
    appId: "1:581939399647:web:09667fc79e8f459fe2926a",
    measurementId: "G-DVTE7YJSY4"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();