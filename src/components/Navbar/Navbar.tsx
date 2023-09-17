import './Navbar.scss';
import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { auth } from '../../firebase/config';
import { useUserAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const UserNavbar: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);
    const { user } = useUserAuth();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setIsLoggedIn(false);
            console.log('User logged out successfully');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const { cartQuantity, openCart } = useCart()

    const toggleUserInfo = () => {
        setIsUserInfoVisible(!isUserInfoVisible);
    };

    return (
        <Navbar className="navbar p-3" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Webshop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
                    </Nav>

                    {isLoggedIn ? (
                        <div className='user-info' onClick={toggleUserInfo}>
                            {user && user.displayName ? (
                                <div className="displayName">
                                    {user.photoURL && (
                                        <div>
                                            <img className="userImg" src={user.photoURL} alt="User Profile" />
                                        </div>
                                    )}
                                    {user.displayName}
                                </div>
                            ) : null}
                            {isUserInfoVisible && (
                                <div className="user-info-details">
                                    <h3 className="title is-3">User Information</h3>
                                    <p><strong>Name:</strong> {user?.displayName}</p>
                                    <p><strong>Email:</strong> {user?.email}</p>
                                    <Button className="btn btn-danger mr-1" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Button variant="primary" className="login-Btn" href="/signIn">
                            Login
                        </Button>
                    )}

                    <Button onClick={openCart} className="cart-button"
                        variant="success">
                        <FaShoppingCart />
                        <div className='cart-counter'>
                            {cartQuantity}
                        </div>
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default UserNavbar;