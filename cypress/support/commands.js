import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import { attachCustomCommands } from "cypress-firebase";
import "cypress-file-upload";
const fbConfig = {
  // Your config from Firebase Console

  apiKey: Cypress.env("FIREBASE_API_KEY"),
  authDomain: Cypress.env("FIREBASE_AUTH_DOMAIN"),
  projectId: Cypress.env("FIREBASE_PROJECT_ID"),
  storageBucket: Cypress.env("FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: Cypress.env("FIREBASE_MESSAGING_SENDER_ID"),
  appId: Cypress.env("FIREBASE_APP_ID"),
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
