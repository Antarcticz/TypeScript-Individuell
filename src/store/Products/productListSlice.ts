import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import productsService from "./productService";

interface Product {
    id: number;
    imgUrl: string;
    name: string;
    price: number;
}

interface ProductListState {
    products: Product[];
    error: string | null;
    loading: boolean;
}

const initialState: ProductListState = {
    products: [],
    error: null,
    loading: false,
}

export const addProduct = createAsyncThunk<Product, Product, { rejectValue: SerializedError }>('product-list/add', async (productData, thunkAPI) => {
    try {
        const response = await productsService.createProduct(productData);
        return response;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const getProducts = createAsyncThunk<Product[], void, { rejectValue: SerializedError }>('product-list/getAll', async (_, thunkAPI) => {
    try {
        const response = await productsService.getAllAsync('products');
        return response as Product[];
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const productListSlice = createSlice({
    name: 'Product-list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message ?? "An error occurred";
            })
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message ?? "An error occurred";
            });
    },
});

export default productListSlice.reducer;