import { createSlice } from '@reduxjs/toolkit';

import {GlobalError, ProductsMutation} from '../../types';
import { productCreate} from './productsThunk.ts';
import {RootState} from '../../../app/store.ts';

interface ProductsState {
  posts: ProductsMutation | null;
  isLoadingProduct: boolean;
  isErrorProduct: GlobalError | null;
  // allPosts: Posts[];
  // post: Posts | null;

  // isLoadingPosts: boolean;
  // isLoadViewPost: boolean;
}

const initialState: ProductsState = {
  posts: null,
  isLoadingProduct: false,
  isErrorProduct: null,
  // allPosts: [],
  // post: null,
  //
  // isLoadingPosts: false,
  // isLoadViewPost: false,
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

    // builder.addCase(getPosts.pending, (state) => {
    //   state.isLoadingPosts = true;
    // });
    // builder.addCase(getPosts.fulfilled, (state, {payload: data}) => {
    //   state.isLoadingPosts = false;
    //   state.allPosts = data;
    // });
    // builder.addCase(getPosts.rejected, (state) => {
    //   state.isLoadingPosts = false;
    // });
    //
    // builder.addCase(viewOnePost.pending, (state) => {
    //   state.isLoadViewPost = true;
    // });
    // builder.addCase(viewOnePost.fulfilled, (state, {payload: post}: PayloadAction<Posts>) => {
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
//
// export const getAllPost = (state: RootState) => state.posts.allPosts;
// export const isLoadPosts = (state: RootState) => state.posts.isLoadingPosts;
//
// export const selectViewPost = (state: RootState) => state.posts.post;
