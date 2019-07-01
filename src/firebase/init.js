import firebase from 'firebase/app'
import firestore from  'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCxO8Njxlhnyl0mqQ2aDNAsigi_oYVuSik",
    authDomain: "vue-recepies.firebaseapp.com",
    databaseURL: "https://vue-recepies.firebaseio.com",
    projectId: "vue-recepies",
    storageBucket: "vue-recepies.appspot.com",
    messagingSenderId: "849911262296",
    appId: "1:849911262296:web:bb4469a9bf1c19a9"
  };
  // Initialize Firebase
    const firebaseApp = firebase.initializeApp(firebaseConfig);
    //firebaseApp.firestore().settings({ timestampsInSnapshots: true })
  
    // Export firestore database
    export default firebaseApp.firestore();
