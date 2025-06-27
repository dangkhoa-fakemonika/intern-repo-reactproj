import {combineReducers, configureStore} from "@reduxjs/toolkit";
import shoppingCart from "@/shared/stores/states/shopping-cart.ts";

const rootReducer = combineReducers({
  shoppingCart : shoppingCart,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;