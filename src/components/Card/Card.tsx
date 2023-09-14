import '../../index.scss';
import './Card.scss';
import React from 'react';
import { Link } from 'react-router-dom';


interface CardProps {
    product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
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