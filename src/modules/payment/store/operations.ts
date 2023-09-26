/* eslint-disable prettier/prettier */
import * as axiosInstance from 'store/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICartsData, ResponseCarts } from 'types/cart-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { actions as actionsCart } from 'modules/cart/store'

const pathCart: string = 'carts';

export const getPay = createAsyncThunk<ResponseCarts, { token?: string }>(
    `${pathCart}/getCarts`,
    async (body, { rejectWithValue, dispatch }) => {
        axiosInstance.setHeaders({ 'x-food-access-token': body?.token });
        return axiosInstance.get(`${pathCart}`).then(res => res).catch(err => rejectWithValue(err?.response?.data));
    }
);
