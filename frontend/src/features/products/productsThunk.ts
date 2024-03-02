import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

import { RootState } from '../../../app/store.ts';

import axiosApi from '../../axiosApi.ts';
import {GlobalError, Product, ProductsMutation} from '../../types';

export const productCreate = createAsyncThunk<ProductsMutation, Product, {  rejectValue: GlobalError, state: RootState }>(
  'products/productCreate',
  async (productPost,  {rejectWithValue, getState}) => {

    try {
      const token = getState().users.users?.token;

      const formData = new FormData();
      const keys = Object.keys(productPost) as (keyof Product)[];

      keys.forEach(key => {
        const value = productPost[key];

        if (value !== null) {
          if (typeof value === 'number') {
            formData.append(key, value.toString());
          } else {
            formData.append(key, value);
          }
        }
      });

      const response = await axiosApi.post('/products', formData, {headers: { 'Authorization': 'Bearer ' + token}});
      return response.data;

    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);


// export const getPosts = createAsyncThunk<Posts[]>(
//   'posts/getPosts',
//   async () => {
//     const response = await axiosApi.get<Posts []>('/posts');
//     return response.data;
//   }
// );
//
// export const viewOnePost = createAsyncThunk<Posts, string>(
//   'posts/viewOnePost',
//   async (id) => {
//     const response = await axiosApi.get('/posts/' + id);
//     return response.data;
//   }
// );