// utils/firebase.ts

import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Function to refresh Firebase token
export const refreshFirebaseToken = async () => {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
  };

  // Initialize Firebase app only if it hasn't been initialized
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }

  const auth = getAuth();

  try {
    const user: any = await new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error("User not logged in"));
        }
        unsubscribe(); // Unsubscribe from the observer
      });
    });

    if (user) {
      await user.getIdToken(true); // Force refresh the token
      const refreshedToken = await user.getIdToken();
      // Update token in local storage or state
      localStorage.setItem("token", refreshedToken);

      return refreshedToken;
    }
  } catch (error) {
    console.log("Error refreshing Firebase token:", error);
    throw error;
  }
};
