import '../scssPages/home.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/Products/productListSlice';
import { RootState } from '../store/index';
import Section2 from '../components/Home/Section2';

interface Product {
    id: number;
    imgUrl: string;
    name: string;
    price: number;
}

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const products: Product[] = useSelector((state: RootState) => state.products.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div>
            <div className="container-home">
                <Section2 products={products} />
            </div>
        </div>
    );
};

export default Home;