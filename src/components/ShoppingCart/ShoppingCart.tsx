import React from 'react';
import CartProduct from './CartProduct';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector from react-redux for managing state
import { clearCart } from '../../store/ShoppingCart/shoppingCartSlice'; // Import the clearCart action creator
import { Link } from 'react-router-dom';
import { RootState } from '../../store/index'; // Import RootState to access the Redux store state

// Define props for the ShoppingCartComponent
interface ShoppingCartProps {
    checkout?: boolean; // An optional boolean prop for checkout mode
}

// Functional component ShoppingCartComponent for rendering the shopping cart
const ShoppingCartComponent: React.FC<ShoppingCartProps> = ({ checkout }) => {
    // Access cart and totalAmount from the Redux store state using useSelector
    const { cart, totalAmount } = useSelector((state: RootState) => state.shoppingCart);
    const dispatch = useDispatch(); // Access the dispatch function for dispatching actions

    return (
        <div onClick={(e) => e.stopPropagation()}> {/* Prevent click propagation */}
            {cart.length < 1 && ( // Conditionally render a message when the cart is empty
                <div className='p-2 text-center'>
                    Your cart is empty
                </div>
            )}
            {cart.map((item) => ( // Map through cart items and render CartProduct component for each item
                <CartProduct key={'cart' + item.product.id} item={item} />
            ))}
            <div className="dropdown-divider"></div>
            <div className='d-flex justify-content-between align-items-center p-2'>
                <div>
                    <p className='m-0'>Total Price: ${totalAmount}</p>
                    <small className='text-muted'>inkl. vat</small>
                </div>
                <div>
                    {!checkout && (
                        <>
                            <button className='btn btn-warning' onClick={() => dispatch(clearCart())}>Clear Cart</button>
                            <Link to="checkout" className='btn btn-info ms-1'>Checkout</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartComponent;