import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAxzrgO8qAfAu-zEmjqIKd7-ILGA22NWFs",
    authDomain: "clone-37ef5.firebaseapp.com",
    projectId: "clone-37ef5",
    storageBucket: "clone-37ef5.appspot.com",
    messagingSenderId: "619165088676",
    appId: "1:619165088676:web:624b606d39d23886575f31"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export {db,auth}