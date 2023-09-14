import '../scssPages/Home.scss';
import React, { useEffect } from 'react';
import Section2 from '../components/Home/Section2';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/Products/productListSlice';
import { RootState } from '../store/index';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface Product {
    id: number;
    imgUrl: string;
    name: string;
    price: number;
}

const Home: React.FC = () => {
    const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
    const products: Product[] = useSelector((state: RootState) => state.productList.products);

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