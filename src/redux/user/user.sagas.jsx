import UserActionTypes from "./user.types";

import { 
  auth, 
  createUserProfileDocument,
  getCurrentUser,
  googleProvider, 
} from "../../firebase/firebase.utils";
import {  SignInSuccess, SignInFailure } from "./user.actions";
import { takeLatest, put, all, call } from "redux-saga/effects";

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth); 
  } catch (error) {
    yield put(SignInFailure(error));
  }
}

export function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    yield put(
      SignInSuccess({id: userSnapshot.id, ...userSnapshot.data()})
    )
  } catch(error) {
    yield put(SignInFailure(error))
  }
}

export function* signInWithEmail({ payload: { email, password }}) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch(error) {
    yield put(SignInFailure(error))
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch(error) {
    yield put(SignInFailure(error))
  }
}

export function* onCheckUserSession() {
  yield takeLatest(
    UserActionTypes.CHECK_USER_SESSION,
    isUserAuthenticated
  )
}

export function* onEmailSignInStart() {
  yield takeLatest(
    UserActionTypes.EMAIL_SIGN_IN_START,
    signInWithEmail
  )
}

export function* onGoogleSignInStart() {
  yield takeLatest(
    UserActionTypes.GOOGLE_SIGN_IN_START,
    signInWithGoogle,
  ) 
}

export function* userSagas() {
   yield all([
    call(isUserAuthenticated),
    call(onEmailSignInStart),
    call(onGoogleSignInStart),
  ])
}