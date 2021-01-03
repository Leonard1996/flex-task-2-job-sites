import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAQxw6_CuxAFTljzHU4peHxsjZRuhft-KU",
    authDomain: "meme-generator-ba956.firebaseapp.com",
    projectId: "meme-generator-ba956",
    storageBucket: "meme-generator-ba956.appspot.com",
    messagingSenderId: "1003037174458",
    appId: "1:1003037174458:web:97bc00d56871b4cb90b083"
  };

  export const app = firebase.initializeApp(firebaseConfig);
  export const db = app.firestore();