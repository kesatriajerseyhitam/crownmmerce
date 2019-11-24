import ShopActionTypes from './shop.types';
import { takeEvery } from 'redux-saga/effects';

export function* fecthCollectionAsync() {
  yield console.log('I am fired');
}

export function* fetchCollectionStart() {
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fecthCollectionAsync
  )
}