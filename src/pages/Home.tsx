import '../scssPages/Home.scss';
import React, { useEffect } from 'react';
import Section2 from '../components/Home/Section2';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/Products/productListSlice';
import { RootState } from '../store/index';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

// Define the Home functional component
const Home: React.FC = () => {
    // Initialize the useDispatch hook to dispatch actions
    const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

    // Get the 'products' data from the Redux store using useSelector
    const products: Product[] = useSelector((state: RootState) => state.productList.products);

    // Use useEffect to dispatch the 'getProducts' action when the component mounts
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