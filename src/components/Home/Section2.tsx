import './Section2.scss';
import Card from '../Card/Card';
import React from 'react';

interface Product {
    id: number;
    imgUrl: string;
    name: string;
    price: number;
}

interface HomeProps {
    products: Product[];
}

const Section2: React.FC<HomeProps> = ({ products }) => {
    return (
        <div className="home-section-2">
            <h2>Products</h2>
            <div className="product-container">
                {products.length > 0 ? (
                    products.map((product) => <Card key={product.id} product={product} />)
                ) : (
                    <h2>No products to show</h2>
                )}
            </div>
        </div>
    );
};

export default Section2;