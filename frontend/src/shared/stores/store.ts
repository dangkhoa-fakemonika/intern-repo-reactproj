import {combineReducers, configureStore} from "@reduxjs/toolkit";
import shoppingCart from "@/shared/stores/states/shopping-cart.ts";
import user from "@/shared/stores/states/user.ts";
import localStorage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage : localStorage,
  whitelist: ["user"]
}

const rootReducer = combineReducers({
  shoppingCart : shoppingCart,
  user : user
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Redux-persist requires ignoring these specific actions in middleware
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;