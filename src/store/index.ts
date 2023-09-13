import { configureStore } from '@reduxjs/toolkit'
import productListSlice from './Products/productListSlice'
import shoppingCartSlice from './ShoppingCart/shoppingCartSlice';

const store = configureStore({
  reducer: {
    productList: productListSlice,
    shoppingCart: shoppingCartSlice
  }
});


export type RootState = ReturnType<typeof store.getState>;

export default store;