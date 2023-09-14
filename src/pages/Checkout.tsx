import '../scssPages/Checkout.scss';
import React from 'react';
import ShoppingCart from '../components/ShoppingCart/ShoppingCart';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';

const Checkout: React.FC = () => {
  const { cart } = useSelector((state: RootState) => state.shoppingCart);

  const placeOrder = () => {
    const order = cart.map(item => {
      return { id: item.product.id, quantity: item.quantity };
    });
  };

  return (
    <div className='container-checkout'>
      <h1 className='mt-5 mb-5'>Complete your purchase</h1>
      <ShoppingCart checkout={true} />

      <button className='btn btn-success mt-5 mb-5' onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;