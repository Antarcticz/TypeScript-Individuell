import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface CartItem {
  product: ProductDescription;
  quantity: number;
}

interface ShoppingCartState {
  cart: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: ShoppingCartState = {
  cart: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const getTotalQuantity = (cart: CartItem[]): number => {
  let total = 0;
  cart.forEach((item) => {
    total += item.quantity;
  });
  return total;
};

const getTotalAmount = (cart: CartItem[]): number => {
  let amount = 0;
  cart.forEach((item) => {
    amount += item.product.price * item.quantity;
  });
  return amount;
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductDescription>) => {
      const itemRef = state.cart.find((item) => item.product.id === action.payload.id);

      itemRef
        ? (itemRef.quantity += 1)
        : (state.cart = [...state.cart, { product: action.payload, quantity: 1 }]);

      state.totalAmount = getTotalAmount(state.cart);
      state.totalQuantity = getTotalQuantity(state.cart);
    },
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
    removeAll: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.product.id !== action.payload);
      state.totalAmount = getTotalAmount(state.cart);
      state.totalQuantity = getTotalQuantity(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalAmount = getTotalAmount(state.cart);
      state.totalQuantity = getTotalQuantity(state.cart);
    },
    placeOrder: (state) => {
      const order = state.cart.map((item) => {
        return { id: item.product.id, quantity: item.quantity };
      });
    },
  },
});

export const { addToCart, removeOne, removeAll, clearCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;