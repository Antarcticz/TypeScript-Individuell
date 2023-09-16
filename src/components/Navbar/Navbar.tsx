import React from 'react';
import './Navbar.scss';
import { Link, NavLink } from 'react-router-dom';
import ShoppingCartComponent from '../ShoppingCart/ShoppingCart';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux for accessing state
import { RootState } from '../../store/index';

// Functional component Navbar for rendering the website's navigation bar
const Navbar: React.FC = () => {
    // Access the totalQuantity from the shoppingCart state using useSelector
    const { totalQuantity } = useSelector((state: RootState) => state.shoppingCart);

    // Return the navigation bar with links and shopping cart icon
    return (
        <nav className="navbar d-flex justify-content-center align-item-center p-5">
            <div className="container-navbar">
                <Link className="navbar-brand" to="/">WEBSHOP</Link>
                <ul className="nav-links gap-5">
                    <li><NavLink to="/">HOME</NavLink></li>
                    <li className="nav-item dropdown">
                        <span className="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <FaShoppingCart />
                            {totalQuantity > 0 && ( // Display a badge if the totalQuantity is greater than 0
                                <span className='position-absolute start-100 translate-middle badge rounded-pill bg-danger'>{totalQuantity}</span>
                            )}
                        </span>
                        <ul className="dropdown-menu dropdown-menu-end shopping-cart">
                            <ShoppingCartComponent />
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;