/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as axiosInstance from 'store/axios';
import { ResponseHearts, ResponsePostHearts } from 'types/haert-type';
import { actions as actionsHeart } from 'modules/heart/store';

const pathCart: string = 'hearts';

export const getHearts = createAsyncThunk<ResponseHearts, { token?: string }>(
    `${pathCart}/getHearts`,
    async (body, { rejectWithValue, dispatch }) => {
        axiosInstance.setHeaders({ 'x-food-access-token': body?.token });
        return axiosInstance.get(`${pathCart}`).then(res => {
            return String(res) === String(null) ? [] : res;
        }).catch(err => rejectWithValue(err?.response?.data));
    }
);

export const postHearts = createAsyncThunk<ResponsePostHearts, { products_id: string | number, tokenProp: string }>(
    `${pathCart}/postHearts`,
    async (body, { rejectWithValue, dispatch }) => {
        const token: any = await AsyncStorage.getItem('token');
        axiosInstance.setHeaders({ 'x-food-access-token': token ?? body?.tokenProp });
        return axiosInstance.post(`${pathCart}`, body).then(res => {
            const { status, mess } = res;
            status && dispatch(actionsHeart.addAndUpdateCarts({ id: body?.products_id }));
            return res;
        }).catch(err => rejectWithValue(err?.response?.data));
    }
);
