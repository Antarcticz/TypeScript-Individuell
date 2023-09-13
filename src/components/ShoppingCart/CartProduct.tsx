import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeOne, removeAll } from '../../store/ShoppingCart/shoppingCartSlice';
import { FaTrash } from 'react-icons/fa';

interface CartProductProps {
    item: {
        product: {
            id: number;
            imgUrl: string;
            name: string;
            price: number;
        };
        quantity: number;
    };
}

const CartProduct: React.FC<CartProductProps> = ({ item }) => {
    const dispatch = useDispatch();

    const add = () => {
        dispatch(addToCart(item.product));
    };

    const remove = () => {
        dispatch(removeOne(item.product.id));
    };

    const del = () => {
        dispatch(removeAll(item.product.id));
    };

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