import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyDBJTQ_cChamPiSKVV9-Sqnts0bRBw8bhs",
    authDomain: "crwn-db-99.firebaseapp.com",
    projectId: "crwn-db-99",
    storageBucket: "crwn-db-99.appspot.com",
    messagingSenderId: "391899899847",
    appId: "1:391899899847:web:7ebbaf8fe4a0b754d19be2",
    measurementId: "G-J7H80B7SG5"
  };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider=new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () =>auth.signInWithPopup(provider);

export default firebase;