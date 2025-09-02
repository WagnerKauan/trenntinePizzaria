import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from './cart/cartSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import checkoutReducer from './checkout/checkoutSlice'
import promotionsReducer from './promotions/promotionsSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'checkout', 'promotions'],
}

const rootReducer = combineReducers({
  cart: cartReducer,
  checkout: checkoutReducer,
  promotions: promotionsReducer,
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

