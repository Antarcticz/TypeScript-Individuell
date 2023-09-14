import React, { useEffect } from 'react';
import '../scssPages/ProductDetails.scss';
import useDoc from '../hooks/useDocks';
import { FaCartPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { addToCart } from '../store/ShoppingCart/shoppingCartSlice';
import { useDispatch } from 'react-redux';


const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const dispatch = useDispatch();
    
    const { data: product, error } = useDoc('products', id || '');

    useEffect(() => {
        if (id === undefined) {
            console.error('Product ID not found');
        }
    }, [id]);

    if (!product) {
        return (
            <div>
                {error && <p>{error}</p>}
            </div>
        );
    }

    const handleAddToCart = () => {
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
                        <button className='btn-minus'>-</button>
                        <div className='count'><p>1</p></div>
                        <button className='btn-plus'>+</button>
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