import './Cart.scss';
import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { useLocalStorage } from '../../hooks/useLocalStorage';


interface ProductDetailsProps {
    creationDate: string | number | Date;
    productName: string;
    description: string;
    price: number;
    imageUrl: string;
    id: string;
}

const Cart: React.FC = () => {
    const { cartItems, cartTotal, removeFromCart, increaseCartQuantity, decreaseCartQuantity, getItemQuantity, isOpen, closeCart } = useCart();

    // Use the useLocalStorage hook to save and load cartItems
    const [savedCartItems, setSavedCartItems] = useLocalStorage<ProductDetailsProps[]>("cartItems", []);

    // When the component mounts, update the cartItems with the savedCartItems
    useEffect(() => {
        if (savedCartItems.length > 0) {

            // Loop through savedCartItems and add them to cartItems
            savedCartItems.forEach(item => {
                if (!cartItems.some((existingItem: { id: string; }) => existingItem.id === item.id)) {

                    cartItems.push(item);

                }
            });
        }
    }, [savedCartItems]);

    // When cartItems change, update the savedCartItems
    useEffect(() => {
        setSavedCartItems(cartItems);
    }, [cartItems]);

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ListGroup>
                    {cartItems.map((item: ProductDetailsProps) => (
                        <ListGroup.Item key={item.id} className='cart-item-group'>
                            <img className='cart-item-image' src={item.imageUrl} alt={item.productName}></img>
                            <div className='cart-item-body'>
                                <div className='cart-item-top-body'>
                                    <div>
                                        {item.productName}
                                    </div>
                                    <div>
                                        ${item.price}
                                    </div>
                                </div>
                                <div className='cart-item-bottom-body'>
                                    <Button className='btn btn-primary btn-sm' onClick={() => decreaseCartQuantity(item.id)}>
                                        -
                                    </Button>
                                    {getItemQuantity(item.id)}
                                    <Button className='btn btn-primary btn-sm m-3' onClick={() => increaseCartQuantity(item.id)}>
                                        +
                                    </Button>
                                    <Button className='btn btn-danger btn-sm' onClick={() => removeFromCart(item.id)}>
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <p>Total: ${cartTotal}</p>
                <Button variant="secondary" onClick={closeCart}>
                    Close Cart
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;