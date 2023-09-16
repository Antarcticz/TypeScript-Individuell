import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { getCartsFromLocalStorage, saveCartsToLocalStorage } from "../helpers/localStorage";

// Define the shape of the CartState
interface CartState {
  carts: Product[];
  actions: {
    createCart: (cart: Product) => void;
    getCart: (id: string) => Product | null;
  };
}

// Define the default state for the CartState
const defaultState: CartState = {
  carts: [],
  actions: {
    createCart: (cart) => {}, // Default createCart function
    getCart: (id) => null, // Default getCart function
  },
};

// Create a CartContext with the default state
const CartContext = createContext<CartState>(defaultState);

// Create a CartProvider component
const CartProvider = ({ children }: PropsWithChildren) => {
  // Define the carts state using useState and initialize it from local storage or the default state
  const [carts, setCarts] = useState<Product[]>(
    getCartsFromLocalStorage() || defaultState.carts
  );

  // Use useEffect to save the carts to local storage whenever it changes
  useEffect(() => {
    saveCartsToLocalStorage(carts);
  }, [carts]);

  // Define a function to create a new cart
  const createCart = (cart: Product) => {
    setCarts((state) => {
      // Create a new array of carts with the added cart
      const newCarts = [...state, cart];
      // Save the new carts to local storage
      saveCartsToLocalStorage(newCarts);
      console.log('New carts:', newCarts); // Log the new cart data
      return newCarts;
    });
  };

  // Define a function to get a cart by ID
  const getCart = (id: string) => {
    return carts.find((t) => t.id === id) || null;
  };

  // Render the CartProvider component with CartContext.Provider
  return (
    <CartContext.Provider
      value={{
        carts,
        actions: {
          createCart,
          getCart,
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook called useCarts to access the cart state and actions
const useCarts = () => {
  // Use useContext to get the carts and actions from CartContext
  const { carts, actions } = useContext(CartContext);

  // Return the carts and actions as an object
  return {
    carts,
    actions: {
      ...actions,
      createCart: (cart: Product) => {
        actions.createCart(cart);
      },
    },
  };
};

export { CartProvider, useCarts };