import {createSlice} from "@reduxjs/toolkit";
import type {CartProduct} from "@/shared/types/type.ts";

interface ShoppingCartState {
  cartContent: CartProduct[]
}

const initialState : ShoppingCartState = {
  cartContent: []
}

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers : {
    adjustItemToCart : (state, action) => {
      const product : CartProduct = action.payload;
      console.log(product);
      state.cartContent = state.cartContent.filter((item) => item.product.id !== product.product.id);
      state.cartContent.push(product);
      state.cartContent = state.cartContent.filter((item) => item.amount >= 0);
    },
    clearCart : (state) => {
      state.cartContent = [];
    }
  }
});


export const {adjustItemToCart, clearCart} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;