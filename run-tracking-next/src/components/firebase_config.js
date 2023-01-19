// import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDR5yi_hxKo50VgcuypDbYrbflkTmNv4Yg",
  authDomain: "auth-8c68a.firebaseapp.com",
  databaseURL: "https://auth-8c68a-default-rtdb.firebaseio.com",
  projectId: "auth-8c68a",
  storageBucket: "auth-8c68a.appspot.com",
  messagingSenderId: "541856787536",
  appId: "1:541856787536:web:0530a88830e7c402f0f555",
  measurementId: "G-E3GSGD6TLW",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// const app = initializeApp(firebaseConfig);
export default firebase;
