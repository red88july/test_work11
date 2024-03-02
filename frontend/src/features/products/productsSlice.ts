import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductsMutation, ValidationError } from '../../types';
import { getProducts, productCreate, viewOneProduct } from './productsThunk.ts';
import { RootState } from '../../../app/store.ts';

interface ProductsState {
  posts: ProductsMutation | null;
  isLoadingProduct: boolean;
  isErrorProduct: ValidationError | null;
  allProducts: ProductsMutation[];
  isLoadingProducts: boolean;
  isErrorLoadProducts: boolean;
  product: ProductsMutation | null;
  isLoadViewProduct: boolean;
}

const initialState: ProductsState = {
  posts: null,
  isLoadingProduct: false,
  isErrorProduct: null,
  allProducts: [],
  isLoadingProducts: false,
  isErrorLoadProducts: false,
  product: null,
  isLoadViewProduct: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    builder.addCase(productCreate.pending, (state) => {
      state.isLoadingProduct = true;
      state.isErrorProduct = null;
    });
    builder.addCase(productCreate.fulfilled, (state, {payload: data}) => {
      state.isLoadingProduct = false;
      state.posts = data;
    });
    builder.addCase(productCreate.rejected, (state, {payload: error}) => {
      state.isLoadingProduct = false;
      state.isErrorProduct = error || null;
    });

    builder.addCase(getProducts.pending, (state) => {
      state.isLoadingProducts = true;
      state.isErrorLoadProducts = false;
    });
    builder.addCase(getProducts.fulfilled, (state, {payload: data}) => {
      state.isLoadingProducts = false;
      state.allProducts = data;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoadingProducts = false;
      state.isErrorLoadProducts = true;
    });

    builder.addCase(viewOneProduct.pending, (state) => {
      state.isLoadViewProduct = true;
    });
    builder.addCase(viewOneProduct.fulfilled, (state, {payload: data}: PayloadAction<ProductsMutation>) => {
      state.isLoadViewProduct = false;
      state.product = data;
    });
    builder.addCase(viewOneProduct.rejected, (state) => {
      state.isLoadViewProduct = false;
    });
  }
});

export const productsReducer = productsSlice.reducer;
export const loadingProduct = (state: RootState) => state.products.isLoadingProduct;
export const errorLoadProduct = (state: RootState) => state.products.isErrorProduct;
export const getAllProducts = (state: RootState) => state.products.allProducts;
export const isLoadProducts = (state: RootState) => state.products.isLoadingProducts;
export const isErrorLoadProducts = (state: RootState) => state.products.isErrorLoadProducts;
export const selectViewProduct = (state: RootState) => state.products.product;
export const isLoadViewOne = (state: RootState) => state.products.isLoadViewProduct;