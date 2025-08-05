// Import the functions you need from the SDKs you need-
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxkiqXky9GL7ZB7U9WZxTpU8XK-fVGWMs",
  authDomain: "netflixgpt-373ec.firebaseapp.com",
  projectId: "netflixgpt-373ec",
  storageBucket: "netflixgpt-373ec.firebasestorage.app",
  messagingSenderId: "109885595914",
  appId: "1:109885595914:web:bff59b1354160d9ff75af3",
  measurementId: "G-SD2NTSHJEK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

export const getFriendlyFirebaseError = (code) => {
  const messages = {
    "auth/invalid-credential": "Invalid email or password.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/email-already-in-use": "This email is already registered.",
    // Add more as needed
  };

  return messages[code] || "Something went wrong. Please try again.";
};
