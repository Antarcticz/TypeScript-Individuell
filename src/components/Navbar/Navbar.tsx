import React from 'react';
import './Navbar.scss';
import { Link, NavLink } from 'react-router-dom';
import ShoppingCartComponent from '../ShoppingCart/ShoppingCart'; // Renamed import
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index'; // Make sure to replace with your actual store structure

const Navbar: React.FC = () => {
    const { totalQuantity } = useSelector((state: RootState) => state.shoppingCart);

    return (
        <nav className="navbar d-flex justify-content-center align-item-center p-5">
            <div className="container-navbar">
                <Link className="navbar-brand" to="/"><img src="/Placeholders/Logo.svg" alt="" /></Link>
                <ul className="nav-links gap-5">
                    <li><NavLink to="/">HOME</NavLink></li>
                    <li className="nav-item dropdown">
                        <span className="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <FaShoppingCart />
                            {totalQuantity > 0 && (
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