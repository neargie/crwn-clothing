import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const config = {
    apiKey: "AIzaSyAZAlax9n6HhbJIVm84qDT7AGuLiLmZ-zw",
    authDomain: "crwndb-f5358.firebaseapp.com",
    projectId: "crwndb-f5358",
    storageBucket: "crwndb-f5358.appspot.com",
    messagingSenderId: "108036590962",
    appId: "1:108036590962:web:77928f5724f63bdfe8a1eb"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prmpt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;