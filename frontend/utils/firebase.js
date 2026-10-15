
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nivanai-28.firebaseapp.com",
  projectId: "nivanai-28",
  storageBucket: "nivanai-28.firebasestorage.app",
  messagingSenderId: "547284522969",
  appId: "1:547284522969:web:6562302f2a6d41f2916bc8",
  measurementId: "G-9EV3X42WLL",
};

const app = await initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
