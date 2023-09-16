// Import required styles and dependencies
import React, { useEffect } from 'react';
import '../scssPages/ProductDetails.scss';
import useDoc from '../hooks/useDocks';
import { FaCartPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { addToCart } from '../store/ShoppingCart/shoppingCartSlice';
import { useDispatch } from 'react-redux';

// Define the ProductDetails functional component
const ProductDetails: React.FC = () => {
    // Get the 'id' parameter from the URL using useParams
    const { id } = useParams<{ id?: string }>();

    // Initialize the useDispatch hook to dispatch actions
    const dispatch = useDispatch();

    // Fetch product data based on the 'id' using the 'useDoc' hook
    const { data: product, error } = useDoc('products', id || '');

    // Use useEffect to handle cases where 'id' is undefined
    useEffect(() => {
        if (id === undefined) {
            console.error('Product ID not found');
        }
    }, [id]);

    // Render error message if 'product' is not available
    if (!product) {
        return (
            <div>
                {error && <p>{error}</p>}
            </div>
        );
    }

    // Handle adding the product to the cart
    const handleAddToCart = () => {
        // Dispatch the 'addToCart' action with product details
        dispatch(addToCart({
            id: product.id,
            imgUrl: product.imgUrl,
            name: product.name,
            description: product.description,
            price: product.price,
        }));
    };

    return (
        <div className="container-productDetails">
            <div className='productdetails-section-1'>
                <div className='container-left'>
                    <div className='img-big'>
                        <img src={product.imgUrl} className="img-fluid" alt={product.name} />
                    </div>
                </div>
                <div className="container-right">
                    <div className="product-info">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                    </div>
                    <div className="price">
                        <p>${product.price}</p>
                    </div>
                    <div className="addToCart">
                        <button className='general-btn btn-cart' onClick={handleAddToCart}>
                            Add to Cart <FaCartPlus />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;