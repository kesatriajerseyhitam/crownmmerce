import ShopActionTypes from './shop.types';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';
import { firestore, convertCollectionSnapshotToMap } from './../../firebase/firebase.utils';
import { takeLatest, call, put } from 'redux-saga/effects';

export function* fecthCollectionAsync() {
  try {
    const collectionRef = firestore.collection(`collections`);
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fecthCollectionAsync
  )
}