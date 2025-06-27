import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBc5OfDbMWwJUooAjV_mmIZ7H9_00UTCU8",
  authDomain: "rentit-c321b.firebaseapp.com",
  projectId: "rentit-c321b",
  storageBucket: "rentit-c321b.appspot.com",
  messagingSenderId: "742802380883",
  appId: "1:742802380883:web:3865c4e6e1777b86544ea6",
  measurementId: "G-V883DW8ZTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);