import app from 'firebase/app';
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDj2tNtmgk9qXk5iIilXLg5sCOtywRCViw",
    authDomain: "proyectoprog3-daceb.firebaseapp.com",
    projectId: "proyectoprog3-daceb",
    storageBucket: "proyectoprog3-daceb.appspot.com",
    messagingSenderId: "51014819417",
    appId: "1:51014819417:web:8f06cf627bc216551d5b48"
  };

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();