import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

import { RootState } from '../../../app/store.ts';

import axiosApi from '../../axiosApi.ts';
import {Product, ProductsMutation, ValidationError} from '../../types';

export const productCreate = createAsyncThunk<ProductsMutation, Product, {  rejectValue: ValidationError, state: RootState }>(
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

export const getProducts = createAsyncThunk<ProductsMutation[]>(
  'products/getProducts',
  async () => {
    const response = await axiosApi.get<ProductsMutation []>('/products');
    return response.data;
  }
);

export const viewOneProduct = createAsyncThunk<ProductsMutation, string>(
  'products/viewOneProduct',
  async (id) => {
    const response = await axiosApi.get('/products/' + id);
    return response.data;
  }
);