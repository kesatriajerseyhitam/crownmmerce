import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import { createStore, applyMiddleware } from 'redux';
import { fetchCollectionStart } from './shop/shop.sagas';
import { persistStore } from 'redux-persist';

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(fetchCollectionStart);
export const persistor = persistStore(store);

// export default { store, persistStore };