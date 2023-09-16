import '../../index.scss';
import './Card.scss';
import React from 'react';
import { Link } from 'react-router-dom';

// Define the CardProps interface to specify the expected prop structure
interface CardProps {
    product: Product; // A product object passed as a prop
}

// Functional component Card that accepts product as a prop
const Card: React.FC<CardProps> = ({ product }) => {
    console.log(product); // Log the product to the console for debugging

    // Return a Link component that navigates to the product details page
    return (
        <Link to={`/product-details/${product.id}`} style={{ textDecoration: 'none' }}>
            <div className="home-product-card">
                <img src={product.imgUrl} alt={product.name} />
                <p>{product.name.slice(0, 30)}...</p>
                <span>${product.price}</span>
            </div>
        </Link>
    );
};

export default Card;