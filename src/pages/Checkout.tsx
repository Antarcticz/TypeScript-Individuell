import '../scssPages/Checkout.scss';
import React from 'react';
import ShoppingCart from '../components/ShoppingCart/ShoppingCart';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';

// Define the Checkout functional component
const Checkout: React.FC = () => {
  // Select the 'cart' state from the Redux store using the useSelector hook
  const { cart } = useSelector((state: RootState) => state.shoppingCart);

  // Function to place an order
  const placeOrder = () => {
    // Create an 'order' array by mapping over the items in the 'cart'
    const order = cart.map(item => {
      return { id: item.product.id, quantity: item.quantity };
    });
  };

  return (
    <div className='container-checkout'>
      <h1 className='mt-5 mb-5'>Complete your purchase</h1>
      <ShoppingCart checkout={true} /> {/* Render the ShoppingCart component with 'checkout' prop set to true */}

      {/* Button to place the order, triggers the 'placeOrder' function */}
      <button className='btn btn-success mt-5 mb-5' onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;