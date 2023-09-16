import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import productsService from "./productService"; // Import the products service for fetching and adding products

// Define the shape of the ProductListState
interface ProductListState {
    products: Product[];         // Array to store products
    error: string | null;       // Error message (if any)
    loading: boolean;           // Loading indicator
}

const initialState: ProductListState = {
    products: [],
    error: null,
    loading: false,
}

// Define an async thunk to add a product
export const addProduct = createAsyncThunk<Product, Product, { rejectValue: SerializedError }>(
    'product-list/add',
    async (productData, thunkAPI) => {
        try {
            const response = await productsService.createProduct(productData); // Call the API to add a product
            return response;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message); // Handle errors and reject the promise with an error message
        }
    }
);

// Define an async thunk to fetch all products
export const getProducts = createAsyncThunk<Product[], void, { rejectValue: SerializedError }>(
    'product-list/getAll',
    async (_, thunkAPI) => {
        try {
            const response = await productsService.getAllAsync('products'); // Call the API to fetch all products
            return response as Product[];
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message); // Handle errors and reject the promise with an error message
        }
    }
);

// Create a slice for the product list
export const productListSlice = createSlice({
    name: 'Product-list',   // Slice name
    initialState,           // Initial state defined earlier
    reducers: {},           // Reducers (none defined here)
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