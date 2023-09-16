import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of a cart item
interface CartItem {
  product: ProductDescription;
  quantity: number;
}

// Define the structure of the shopping cart state
interface ShoppingCartState {
  cart: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

// Initialize the shopping cart state
const initialState: ShoppingCartState = {
  cart: [],
  totalQuantity: 0,
  totalAmount: 0,
};

// Helper function to calculate the total quantity in the cart
const getTotalQuantity = (cart: CartItem[]): number => {
  let total = 0;
  cart.forEach((item) => {
    total += item.quantity;
  });
  return total;
};

// Helper function to calculate the total amount in the cart
const getTotalAmount = (cart: CartItem[]): number => {
  let amount = 0;
  cart.forEach((item) => {
    amount += item.product.price * item.quantity;
  });
  return amount;
};

// Create a Redux slice for the shopping cart
export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    // Add a product to the cart or update its quantity
    addToCart: (state, action: PayloadAction<ProductDescription>) => {
      const itemRef = state.cart.find((item) => item.product.id === action.payload.id);

      itemRef
        ? (itemRef.quantity += 1)
        : (state.cart = [...state.cart, { product: action.payload, quantity: 1 }]);

      state.totalAmount = getTotalAmount(state.cart);
      state.totalQuantity = getTotalQuantity(state.cart);
    },
    // Remove one quantity of a product from the cart
    removeOne: (state, action: PayloadAction<number>) => {
      const itemRef = state.cart.find((item) => item.product.id === action.payload);

      if (itemRef && itemRef.quantity <= 1) {
        state.cart = state.cart.filter((item) => item.product.id !== action.payload);
      } else if (itemRef) {
        itemRef.quantity -= 1;
      }

      state.totalAmount = getTotalAmount(state.cart);
      state.totalQuantity = getTotalQuantity(state.cart);
    },
    // Remove all quantities of a product from the cart
    removeAll: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.product.id !== action.payload);
      state.totalAmount = getTotalAmount(state.cart);
      state.totalQuantity = getTotalQuantity(state.cart);
    },
    // Clear the entire cart
    clearCart: (state) => {
      state.cart = [];
      state.totalAmount = getTotalAmount(state.cart);
      state.totalQuantity = getTotalQuantity(state.cart);
    },
    // Placeholder for placing an order (not implemented)
    placeOrder: (state) => {
      const order = state.cart.map((item) => {
        return { id: item.product.id, quantity: item.quantity };
      });
    },
  },
});


export const { addToCart, removeOne, removeAll, clearCart } = shoppingCartSlice.actions;


export default shoppingCartSlice.reducer;