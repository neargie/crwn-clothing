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

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
    const collectionReference = firestore.collection(collectionKey);

    const batch = firestore.batch(); // create session
    objectToAdd.forEach(obj => {
        const documentReference = collectionReference.doc();
        batch.set(documentReference, obj); // set data into batch
    })

    return await batch.commit(); // after successfully set, batch will commit set data
}

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, routeName, items} = doc.data();

        return {title, routeName, items, id: doc.id}
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscibe = auth.onAuthStateChanged(userAuth => {
            unsubscibe()
            resolve(userAuth)
        }, reject)
    });
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prmpt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;