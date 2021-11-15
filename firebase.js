// Import the functions you need from the SDKs you need
//import firebase from 'firebase/app'
import * as firebase from 'firebase'
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqZXQbajxLeVATdrVH54ZS2YtiCffoOpQ",
  authDomain: "firstapp-cb922.firebaseapp.com",
  projectId: "firstapp-cb922",
  storageBucket: "firstapp-cb922.appspot.com",
  messagingSenderId: "272421736523",
  appId: "1:272421736523:web:6e22c6328ef618fd313dce"
};

//firebase.initializeApp(firebaseConfig)


// Initialize Firebase
let app;
if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig); 
}
else{
  app=firebase.app()
}

const auth = firebase.auth()

const db = firebase.firestore(app);
const dbUsers = firebase.firestore(app);

export const BrainobrainRef = db.collection("Brainobrain");
export const UsersRef = dbUsers.collection("Users");
export {auth};