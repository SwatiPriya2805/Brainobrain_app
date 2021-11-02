// Import the functions you need from the SDKs you need
//import * as firebase from "firebase";
import firebase from 'firebase/app';
import '@firebase/util';
import '@firebase/logger';
import '@firebase/webchannel-wrapper';
import "firebase/auth";
//import firebase from "@firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqZXQbajxLeVATdrVH54ZS2YtiCffoOpQ",
  authDomain: "firstapp-cb922.firebaseapp.com",
  projectId: "firstapp-cb922",
  storageBucket: "firstapp-cb922.appspot.com",
  messagingSenderId: "272421736523",
  appId: "1:272421736523:web:6e22c6328ef618fd313dce"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
   app = firebase.initializeApp(firebaseConfig); 
}
else{
    app=firebase.app()
}

const auth = firebase.auth()

export {auth};