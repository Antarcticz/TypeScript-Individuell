import { configureStore } from '@reduxjs/toolkit'

import productListSlice from './Products/productListSlice'
import shoppingCartSlice from './ShoppingCart/shoppingCartSlice';

// Configure and create the Redux store
const store = configureStore({
  // Combine your reducers (slices) into one
  reducer: {
    productList: productListSlice,
    shoppingCart: shoppingCartSlice
  }
});

// Define the type for the RootState, which will be used in useSelector hooks
export type RootState = ReturnType<typeof store.getState>;

// Export the configured Redux store
export default store;