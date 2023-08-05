import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAx4N6FG_PQxEU0wIQuwduYPbF053yBEW0",
    authDomain: "organizate-1cd01.firebaseapp.com",
    projectId: "organizate-1cd01",
    storageBucket: "organizate-1cd01.appspot.com",
    messagingSenderId: "29044103349",
    appId: "1:29044103349:web:c57449c2edbc1b967746fc",
    measurementId: "G-HEJDNJLTQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)