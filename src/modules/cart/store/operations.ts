/* eslint-disable prettier/prettier */
import * as axiosInstance from 'store/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICartsData, ResponseCarts } from 'types/cart-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { actions as actionsCart } from 'modules/cart/store'

const pathCart: string = 'carts';

export const getCarts = createAsyncThunk<ResponseCarts, { token?: string }>(
    `${pathCart}/getCarts`,
    async (body, { rejectWithValue, dispatch }) => {
        axiosInstance.setHeaders({ 'x-food-access-token': body?.token });
        return axiosInstance.get(`${pathCart}`).then(res => res).catch(err => rejectWithValue(err?.response?.data));
    }
);

export const postCarts = createAsyncThunk<ResponseCarts, { data: ICartsData }>(
    `${pathCart}/postCarts`,
    async (body, { rejectWithValue, dispatch }) => {
        const token: any = await AsyncStorage.getItem('token');
        axiosInstance.setHeaders({ 'x-food-access-token': token });
        const { data } = body;
        const dataCart = {
            productId: data?._id,
            qty: data?.qty,
        };
        return axiosInstance.post(`${pathCart}`, dataCart).then(res => {
            res?.status && dispatch(actionsCart.addCarts(data));
            return res;
        }).catch(err => rejectWithValue(err?.response?.data));
    }
);

export const deleteCarts = createAsyncThunk<ResponseCarts, { productId: string | number }>(
    `${pathCart}/deleteCarts`,
    async (body, { rejectWithValue, dispatch }) => {
        const token: any = await AsyncStorage.getItem('token');
        axiosInstance.setHeaders({ 'x-food-access-token': token });
        return axiosInstance.delet(`${pathCart}/${body?.productId}`).then(res => {
            res?.status && dispatch(actionsCart.deletCarts({ id: body?.productId }));
            return res;
        }).catch(err => rejectWithValue(err?.response?.data));
    }
);
