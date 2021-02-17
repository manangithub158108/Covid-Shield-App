import firebase from 'firebase';

require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyBGUHWx3bNXghr5VfTwHUkfx8sWQ4oaWSc",
    authDomain: "covid-project-c1714.firebaseapp.com",
    projectId: "covid-project-c1714",
    storageBucket: "covid-project-c1714.appspot.com",
    messagingSenderId: "550536005187",
    appId: "1:550536005187:web:47a9ea1adb1737e621f6f6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();