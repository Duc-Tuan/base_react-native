/* eslint-disable prettier/prettier */
import * as axiosInstance from 'store/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseCarts } from 'types/cart-types';

const pathCart: string = 'carts';

export const getCarts = createAsyncThunk<ResponseCarts, { token?: string }>(
    `${pathCart}/getCarts`,
    async (body, { rejectWithValue, dispatch }) => {
        axiosInstance.setHeaders({ 'x-food-access-token': body?.token });
        return axiosInstance.get(`${pathCart}`).then(res => res).catch(err => rejectWithValue(err?.response?.data));
    }
);
