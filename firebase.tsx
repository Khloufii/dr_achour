
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAI3c8O-we8JsfWrSwaP5k3v9xEDvtxq2M",
  authDomain: "site-medecin-eba6b.firebaseapp.com",
  projectId: "site-medecin-eba6b",
  storageBucket: "site-medecin-eba6b.firebasestorage.app",
  messagingSenderId: "507473380500",
  appId: "1:507473380500:web:d7b1cb071d94869ede2081"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
