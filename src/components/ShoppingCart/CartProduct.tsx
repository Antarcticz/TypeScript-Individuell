import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeOne, removeAll } from '../../store/ShoppingCart/shoppingCartSlice';
import { FaTrash } from 'react-icons/fa';
import { useCarts } from '../../utils/contexts/CartContext';

// Define the props for CartProduct component
interface CartProductProps {
  item: {
    product: {
      id: number;
      imgUrl: string;
      name: string;
      description: string;
      price: number;
    };
    quantity: number;
  };
}

// Functional component CartProduct for rendering a product in the cart
const CartProduct: React.FC<CartProductProps> = ({ item }) => {
  // Access carts and actions from the useCarts hook
  const { carts, actions } = useCarts();
  console.log('carts:', carts); // Log the carts array
  console.log('actions:', actions); // Log the actions object

  // Access the dispatch function from redux
  const dispatch = useDispatch();

  const add = () => {
    dispatch(addToCart(item.product)); // Dispatch the addToCart action with the product
  };

  // Function to remove one quantity of a product from the cart
  const remove = () => {
    dispatch(removeOne(item.product.id)); // Dispatch the removeAll action with the product ID
  };

  // Function to remove all quantities of a product from the cart
  const del = () => {
    dispatch(removeAll(item.product.id)); // Dispatch the removeAll action with the product ID
  };

  // Render the cart product details
  return (
    <div className='d-flex justify-content-between align-items-center p-2 gap-5'>
      <Link to={`/product-details/${item.product.id}`} className='d-flex align-items-center text-decoration-none text-dark'>
        <img src={item.product.imgUrl} alt={item.product.name} className='img-fluid cart-image p-5' />
        <div>
          <p className="m-0">{item.product.name}</p>
          <small>{item.quantity}x ${item.product.price}</small>
        </div>
      </Link>

      <div className='buttons d-flex gap-5'>
        <div className="d-flex flex-direction-row btn-group-sm gap-3" role='group'>
          <button className='btn btn-sm btn-dark' onClick={remove}>-</button>
          <button className='btn btn-sm btn-dark' onClick={add}>+</button>
        </div>
        <button className='btn btn-sm btn-danger' onClick={del}><FaTrash /></button>
      </div>
    </div>
  );
};

export default CartProduct;