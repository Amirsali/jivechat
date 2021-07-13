// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ7jYK4x9jZHnsEdxawT4dH0AebQOea4Y",
  authDomain: "jive-chat-1d70c.firebaseapp.com",
  projectId: "jive-chat-1d70c",
  storageBucket: "jive-chat-1d70c.appspot.com",
  messagingSenderId: "325309881357",
  appId: "1:325309881357:web:0f88335dbd2c02ead10944",
  measurementId: "G-D0JHTSDJFC",
};

// firebase database and authentication
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

// google authenticator
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
