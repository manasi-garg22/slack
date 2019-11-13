import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


  var firebaseConfig = {
    apiKey: "AIzaSyDgm8t57T6iuJs7n7j5ah7duxs3hQ7w97w",
    authDomain: "react-clone-c3c64.firebaseapp.com",
    databaseURL: "https://react-clone-c3c64.firebaseio.com",
    projectId: "react-clone-c3c64",
    storageBucket: "https://react-clone-c3c64.appspot.com",
    messagingSenderId: "354283017529",
    appId: "1:354283017529:web:af8e14cb3560622d6104e8",
    measurementId: "G-8E2YR19BLS"
  };

  firebase.initializeApp(firebaseConfig);
  export default  firebase;
