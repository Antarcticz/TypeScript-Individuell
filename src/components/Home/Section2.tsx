import './Section2.scss';
import Card from '../Card/Card';
import React from 'react';

// Define the HomeProps interface to specify the expected prop structure
interface HomeProps {
    products: Product[]; // An array of products passed as a prop
}

// Functional component Section2 that accepts products as a prop
const Section2: React.FC<HomeProps> = ({ products }) => {
    console.log(products); // Log the products to the console for debugging
    
    // Return a section displaying a list of products or a message if there are none
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