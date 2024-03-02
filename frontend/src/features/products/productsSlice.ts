import { createSlice } from '@reduxjs/toolkit';

import {GlobalError, ProductsMutation} from '../../types';
import {getProducts, productCreate} from './productsThunk.ts';
import {RootState} from '../../../app/store.ts';

interface ProductsState {
  posts: ProductsMutation | null;
  isLoadingProduct: boolean;
  isErrorProduct: GlobalError | null;

  allProducts: ProductsMutation[];
  isLoadingProducts: boolean;
  isErrorLoadProducts: boolean;
  // post: Products | null;

  // isLoadViewPost: boolean;
}

const initialState: ProductsState = {
  posts: null,
  isLoadingProduct: false,
  isErrorProduct: null,

  allProducts: [],
  isLoadingProducts: false,
  isErrorLoadProducts: false,

  // isLoadViewPost: false,
  // post: null,
  //
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
    //
    // builder.addCase(viewOnePost.pending, (state) => {
    //   state.isLoadViewPost = true;
    // });
    // builder.addCase(viewOnePost.fulfilled, (state, {payload: post}: PayloadAction<Products>) => {
    //   state.isLoadViewPost = false;
    //   state.post = post;
    // });
    // builder.addCase(viewOnePost.rejected, (state) => {
    //   state.isLoadViewPost = false;
    // });

  }
});

export const productsReducer = productsSlice.reducer;

export const loadingProduct = (state: RootState) => state.products.isLoadingProduct;
export const errorLoadProduct = (state: RootState) => state.products.isErrorProduct;

export const getAllProducts = (state: RootState) => state.products.allProducts;
export const isLoadProducts = (state: RootState) => state.products.isLoadingProducts;
export const isErrorLoadProducts = (state: RootState) => state.products.isErrorLoadProducts;


// export const selectViewPost = (state: RootState) => state.posts.post;
