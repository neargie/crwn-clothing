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

// Collection -> Document -> Collection -> Document
// Users -> Iogt5vOzqCTXamCefYEUav1tp3n1 -> createdAt, displayName, email -> Cart
// create user if login success
export const createUserProfileDocument = async (userAuth, additionalData) => { // additional data is an object
    if (!userAuth) return;

    // get reference user from document database by uid
    const userRef = firestore.doc(`user/${userAuth.uid}`) // gonna save this uid into document if login success
    // get document snapShot
    const snapShot = await userRef.get();

    if (!snapShot.exists) { // if not exists create new users into document
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        // CRUD -> set, get, update, delete (for reference only)
        // looking for users -> get (snapshot only)
        try {
            // save this structure into collection by uid document
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (e) {
            console.log(`Error creating user ${e.message}`);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prmpt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;