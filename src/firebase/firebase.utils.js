import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCPRrXNlLav7vBbymg8Bxy91GsK702ZEpM',
  authDomain: 'crown-db-6972b.firebaseapp.com',
  databaseURL: 'https://crown-db-6972b.firebaseio.com',
  projectId: 'crown-db-6972b',
  storageBucket: 'crown-db-6972b.appspot.com',
  messagingSenderId: '508183920580',
  appId: '1:508183920580:web:0c81dc1fd1e45534f7ee91',
  measurementId: 'G-XTYRY5Y5QH'
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

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
