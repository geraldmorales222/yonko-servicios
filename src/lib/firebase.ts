// src/lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Añadir GoogleAuthProvider

const firebaseConfig = {
  apiKey: "AIzaSyDHI_-e-ctGCaXEfFcG45AFJpCQJhnp0yY",
  authDomain: "yonko-c3226.firebaseapp.com",
  projectId: "yonko-c3226",
  storageBucket: "yonko-c3226.firebasestorage.app",
  messagingSenderId: "218207834314",
  appId: "1:218207834314:web:7c6c460b88a858c158a433"
};

// Singleton para evitar múltiples instancias
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); // Exportar el proveedor