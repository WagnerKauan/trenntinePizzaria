import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from './cart/cartSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import checkoutReducer from './checkout/checkoutSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'checkout'],
}

const rootReducer = combineReducers({
  cart: cartReducer,
  checkout: checkoutReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export const persistor = persistStore(store)

export type RootState  = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

