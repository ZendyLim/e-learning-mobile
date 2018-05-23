'use strict';

import {createStore, applyMiddleware, compose} from 'redux';
import reducers from '../reducers';
import { persistStore, persistReducer,  } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {AsyncStorage} from 'react-native';
import thunk from 'redux-thunk';
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';

const config = {
  key: 'root', // key is required
  storage, // storage is now required
}
const reducer = persistReducer(config, reducers);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// export default function configureStore(onComplete) {
//   let store = createStoreWithMiddleware(reducer)
//   let persistor = persistStore(store)
//   return { persistor, store };
// }
export default function configureStore(onComplete) {
  let store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk),
      offline(offlineConfig)
    )
  );  
  let persistor = persistStore(store)
  return { store, persistor }
}