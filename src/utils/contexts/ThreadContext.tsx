import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { getCartsFromLocalStorage, saveCartsToLocalStorage } from "../helpers/localStorage";

interface CartState {
    carts: Product[]
    actions: {
        createCart: (cart: Product) => void;
        getCart: (id: string) => Product | null
    }
}

const defaultState: CartState = {
    carts: [],
    actions: {
        createCart: (cart) => {},
        getCart: (id) => null
    }
}

const CartContext = createContext<CartState>(defaultState)

const CartProvider = ({children}: PropsWithChildren) => {
    const [carts, setCarts] = useState<Product[]>(defaultState.carts)

    useEffect(() => {
        _getCartsFromLocalStorage()
    },[])

    const _getCartsFromLocalStorage = () => {
        const storedCarts = getCartsFromLocalStorage()
        setCarts(storedCarts)
    }

    const createCart = (cart: Product) => {
        setCarts(state => {
            const newCarts = [...state, cart]
            saveCartsToLocalStorage(newCarts)
            return newCarts
        })
    }

    const getCart = (id: string) => {
        return carts.find(t => t.id === id) || null
    }

    return (
        <CartContext.Provider 
            value={{
                carts,
                actions: {cart
                    createCart,
                    getCart
                }
            }}>
                {children}
        </CartContext.Provider>

    )
}

const useCarts = () => {
    const carts = useContext(CartContext)

    return carts
}

export {
    CartProvider,
    useCarts
}