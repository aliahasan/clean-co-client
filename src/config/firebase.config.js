import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD0V4q75GLDKiwGHGNPtgeuX5A6fSYYakY",
  authDomain: "clean-co-server.firebaseapp.com",
  projectId: "clean-co-server",
  storageBucket: "clean-co-server.appspot.com",
  messagingSenderId: "13580286883",
  appId: "1:13580286883:web:171021a9ca1f3fa1b87816"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
