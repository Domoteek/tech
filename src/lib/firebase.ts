import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAJWTqDaH-x6ogSp5CuppGgGctvPwAwas0",
  authDomain: "gestion-technique-72b6e.firebaseapp.com",
  projectId: "gestion-technique-72b6e",
  storageBucket: "gestion-technique-72b6e.appspot.com",
  messagingSenderId: "162788846738",
  appId: "1:162788846738:web:5d308d2eb9f3cd2d68ca4b",
  measurementId: "G-DDP7C4LP52"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);