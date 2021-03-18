import firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA_UrbjJqf12-cSVitKQw0s-ugTsPnzi2I",
    authDomain: "myproject-55f30.firebaseapp.com",
    projectId: "myproject-55f30",
    storageBucket: "myproject-55f30.appspot.com",
    messagingSenderId: "518892027628",
    appId: "1:518892027628:web:90b8555ea581e070df2fc9",
    measurementId: "G-EJLTRNS2HS"
};

//initialize firebase
firebase.initializeApp(firebaseConfig);
var fire = firebase.auth();
var db = firebase.firestore();


export { fire, db };