// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import firebase from 'firebase';
import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBAylqGvzIBppNolmIJaDSekiz297hHpGA',
  authDomain: 'react-native-map-c1135.firebaseapp.com',
  projectId: 'react-native-map-c1135',
  storageBucket: 'react-native-map-c1135.appspot.com',
  messagingSenderId: '661902709278',
  appId: '1:661902709278:web:0a421ab0f15a63fd56140f',
  measurementId: 'G-BB91ECSKR5',
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = firebase.firestore();

export default {
  firebase,
  db,
};
