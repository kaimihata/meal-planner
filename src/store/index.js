import { AsyncStorage } from 'react-native';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from '../reducers';

const persistConfig = {
  // Root
  key: 'root',
  storage: AsyncStorage,
  // Reducers to save
  whitelist: [
    'Favorites',
    'Calendar',
  ],
  // Reducers to not save
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {
  store,
  persistor,
};
