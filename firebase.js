import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBzz9Z-Ll0HfF4KlJfRXUosQj4Icu3_y3s",
  authDomain: "whatsapp-clone-1be75.firebaseapp.com",
  projectId: "whatsapp-clone-1be75",
  storageBucket: "whatsapp-clone-1be75.appspot.com",
  messagingSenderId: "536327275733",
  appId: "1:536327275733:web:fd9b5dc5ac69babf330e5c"
};


const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };