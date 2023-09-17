import './Details.scss';
import productsService from '../../utils/productService';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';


interface ProductDetailsProps {
    creationDate: string | number | Date;
    productName: string;
    description: string;
    price: number;
    imageUrl: string;
    id: string;
}

const DetailsPage: React.FC = () => {
    const [product, setProduct] = useState<ProductDetailsProps | null>(null);
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();

    const { addToCart } = useCart();

    useEffect(() => {
        if (productId) {
            console.log(`Fetching product with ID: ${productId}`);
            const fetchProductData = async () => {
                try {
                    const productData = await productsService.getProductById(productId);

                    if (productData) {
                        setProduct(productData as ProductDetailsProps);
                    } else {
                        console.error(`Product with ID ${productId} not found`);
                    }
                } catch (error) {
                    console.error('Error fetching product data:', error);
                }
            };

            fetchProductData();
        } else {
            console.error('Missing productId');
        }
    }, [productId]);


    const handleDeleteProduct = async () => {
        if (product) {
            try {
                await productsService.deleteProduct(product.id);
                console.log("Product deleted successfully");

                navigate('/');
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    if (!product) {
        return <div className="loading"></div>;
    }

    return (
        <Container className='details-container'>
            <Row>
                <Col md={6}>
                    <Card className='details-card'>
                        <Card.Header className='details-card-header'>
                            <img className='details-card-image' src={product.imageUrl} alt={product.productName} />
                        </Card.Header>
                        <Card.Body className='details-card-body'>
                            <Card.Title className='details-card-title'>{product.productName}</Card.Title>
                            <Card.Text className='details-card-description'>{product.description}</Card.Text>
                            <div className='details-card-bottom'>
                                <Card.Text className='details-card-price'>Price: $ {product.price}</Card.Text>
                                <Button variant="primary" onClick={() => addToCart(product)}>Add to cart</Button>
                                <Button onClick={handleDeleteProduct} className='btn btn-danger details-remove-product'>Remove Product</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DetailsPage;