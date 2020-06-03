
// import devTools from "remote-redux-devtools";

import { createStore,combineReducers } from 'redux';
import setUser from './reducers/setUser';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import setTrack from './reducers/setTrack';
import setPlaylist from './reducers/setPlaylist';
import setRecent from './reducers/setRecent';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  setUser: setUser,
  setTrack:setTrack,
  setPlaylist:setPlaylist,
  setRecent:setRecent

});


const persistedReducer = persistReducer(persistConfig, rootReducer)
export default () => {
  let store = createStore(persistedReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  let persistor = persistStore(store)
  return { store, persistor }
}




