import ShopActionTypes from './shop.types';
import { firestore, convertCollectionSnapshotToMap } from './../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
})
export const fetchCollectionsSuccess = (collectionMaps) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionMaps
})

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAIL
})

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection(`collections`);
    dispatch(fetchCollectionsStart());

    collectionRef.get().then(snapshot => {
      const collectionMap = convertCollectionSnapshotToMap(snapshot);
      dispatch(fetchCollectionsSuccess(collectionMap));
    }).catch((error) => dispatch(fetchCollectionsFailure(error.message)));
  }
}