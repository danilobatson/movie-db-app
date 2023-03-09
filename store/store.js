import {
  combineReducers,
  configureStore,
  getDefaultMiddleware
} from '@reduxjs/toolkit'
import movieReducer from './movieSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

//Creates reducer from all potential slices
const reducers = combineReducers({
  movie: movieReducer
})

//Configures persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1
}

//Creates persisted reducer
const persistedReducer = persistReducer(persistConfig, reducers)

//Creates store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export default store
