import { createSlice } from '@reduxjs/toolkit';
import {login, registration} from './usersThunk.ts';
import { RootState } from '../../../app/store.ts';

import {GlobalError,  User, ValidationError} from '../../types';

interface UsersState {
  users: User | null;
  isLoadingRegUser: boolean;
  isErrorRegUser: ValidationError | null;
  isLoggingUser: boolean;
  falseLoggingUser: GlobalError | null;
}

const initialState: UsersState = {
  users: null,
  isLoadingRegUser: false,
  isErrorRegUser: null,
  isLoggingUser: false,
  falseLoggingUser: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.users = null;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(registration.pending, (state) => {
      state.isLoadingRegUser = true;
      state.isErrorRegUser = null;
    });
    builder.addCase(registration.fulfilled, (state, {payload: data}) => {
      state.isLoadingRegUser = false;
      state.users = data.user;
    });
    builder.addCase(registration.rejected, (state, {payload: error}) => {
      state.isLoadingRegUser = false;
      state.isErrorRegUser = error || null;
    });

    builder.addCase(login.pending, (state) => {
      state.isLoggingUser = true;
      state.falseLoggingUser = null;
    });
    builder.addCase(login.fulfilled, (state, {payload: data}) => {
      state.isLoggingUser = false;
      state.users = data.user;
    });
    builder.addCase(login.rejected, (state, {payload: error}) => {
      state.isLoggingUser = false;
      state.falseLoggingUser = error || null;
    });
  }
});

export const usersReducer = usersSlice.reducer;
export const {unsetUser} = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.users;
export const isRegisterUser = (state: RootState) => state.users.isLoadingRegUser;
export const isRegisterError = (state: RootState) => state.users.isErrorRegUser;

// export const selectUserDetails = (state: RootState) => state.users.usersDetails;


export const isLoginUser = (state: RootState) => state.users.isLoggingUser;
export const isLoginError = (state: RootState) => state.users.falseLoggingUser;