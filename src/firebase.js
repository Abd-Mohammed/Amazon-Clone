import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBEBjeXdfBKSYDmTkx6JpxiFNHz9gcy20E",
  authDomain: "website-bf006.firebaseapp.com",
  projectId: "website-bf006",
  storageBucket: "website-bf006.appspot.com",
  messagingSenderId: "212843802030",
  appId: "1:212843802030:web:c1dad29443b9f831682c3f",
  measurementId: "G-7RZST3D115",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
