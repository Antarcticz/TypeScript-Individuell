import './HomeProduct.scss'
import React from 'react';
import productsService from '../../utils/productService'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';


export type HomeProductProps = {
    id?: any;
    productName: string;
    price: number;
    imageUrl: string;
    description: string;
};

const HomeProduct: React.FC<HomeProductProps> = ({ id, productName, price, imageUrl, description, }) => {

    return (
        <Card className='product-card'>
            <Link to={`/details/${id}`}>
                <Card.Img variant='top' height='500px' style={{ objectFit: 'cover' }} src={imageUrl} alt={productName} />
                <Card.Body className='d-flex flex-column product-card-body'>
                    <Card.Title className='product-card-title'>{productName.slice(0, 41)}</Card.Title>
                    <Card.Text className='product-card-description'>{description}</Card.Text>
                    <Card.Text>Price: ${productsService.formatCurrency(price)}</Card.Text>
                </Card.Body>
            </Link>
        </Card>
    );
};

export default HomeProduct;