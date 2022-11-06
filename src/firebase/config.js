import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAEFbvc1bGOsuRr0OKnBGhqYykhai0Z7pc",
  authDomain: "test-8438c.firebaseapp.com",
  projectId: "test-8438c",
  storageBucket: "test-8438c.appspot.com",
  messagingSenderId: "1052862463218",
  appId: "1:1052862463218:web:9c1686d852caa067ada46b"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore()