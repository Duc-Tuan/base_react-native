/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as axiosInstance from 'store/axios';
import { ResponseHearts } from 'types/haert-type';

const pathCart: string = 'hearts';

export const getHearts = createAsyncThunk<ResponseHearts, { token?: string }>(
    `${pathCart}/getHearts`,
    async (body, { rejectWithValue, dispatch }) => {
        axiosInstance.setHeaders({ 'x-food-access-token': body?.token });
        return axiosInstance.get(`${pathCart}`).then(res => res).catch(err => rejectWithValue(err?.response?.data));
    }
);

export const postHearts = createAsyncThunk<any, { id: string | number }>(
    `${pathCart}/postHearts`,
    async (body, { rejectWithValue, dispatch }) => {
        const token: any = await AsyncStorage.getItem('token');
        axiosInstance.setHeaders({ 'x-food-access-token': token });
        return axiosInstance.post(`${pathCart}`, body).then(res => {
            console.log('res: ', res);
            return res;
        }).catch(err => rejectWithValue(err?.response?.data));
    }
);
