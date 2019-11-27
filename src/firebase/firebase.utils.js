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

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName, email, createdAt, ...additionalData,
      })
    } catch (error) {
      console.log(`Failed insert authentication user to database`, error.message);
    }
  }

  return userRef;
}

export const convertCollectionSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      id: doc.id,
      items,
      routeName: encodeURI(title.toLowerCase()),
      title,
    }
  })

  return transformedCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {})
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  }) 
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;