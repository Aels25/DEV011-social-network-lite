// firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAyFaL_gwYA_0KzH4m4T9h6ftaHo0bD4_E',
  authDomain: 'dev011-social-network-lite.firebaseapp.com',
  projectId: 'dev011-social-network-lite',
  storageBucket: 'dev011-social-network-lite.appspot.com',
  messagingSenderId: '316146436395',
  appId: '1:316146436395:web:19537a224689c6b9509d6e',
  measurementId: 'G-20XZP5RSX1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth, googleProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup,
};
