/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import * as axiosInstance from 'store/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, ResponseAddress, ResponseAuthen } from 'types/auth-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IFormLogin } from '../screen/Function';
import NavigationService from 'naviagtion/stack/NavigationService';
import { PathName } from 'configs';
import { getCarts } from 'modules/cart/store/operations';
import { getHearts } from 'modules/heart/store/operations';

const urlname: string = 'auths';

export const login = createAsyncThunk<ResponseAuthen, IFormLogin>(
    `${urlname}/login`,
    (body, { rejectWithValue, dispatch }) => {
        return axiosInstance.post(`${urlname}/login`, body).then(async (res) => {
            await dispatch(getHearts({ token: res?.token }));
            await dispatch(getCarts({ token: res?.token }));
            await dispatch(addressOrder({ token: res?.token }));
            return res;
        }).catch(err => {
            console.log(err);

            return rejectWithValue(err?.response?.data)
        });
    }
);

export const autologin = createAsyncThunk<ResponseAuthen>(
    `${urlname}/login`,
    (body, { rejectWithValue, dispatch }) => {
        return axiosInstance.post(`${urlname}/login`).then(async (res) => {
            if (res & res?.status) {
                AsyncStorage.setItem('token', res?.token);
            }
            await dispatch(getHearts({ token: res?.token }));
            await dispatch(getCarts({ token: res?.token }));
            await dispatch(addressOrder({ token: res?.token }));
            return res;
        }).catch(err => rejectWithValue(err?.response?.data));
    }
);

export const logout = createAsyncThunk(`${urlname}/logout`, async () => {
    try {
        await Promise.all([
            AsyncStorage.removeItem('token'),
            axiosInstance.setHeaders({ 'x-food-access-token': '' }),
            NavigationService.reset(PathName.SETTINGSCREEN),
        ]);
    } catch (error) { }
    return true;
});

export const changeInfo = createAsyncThunk<ResponseAuthen, IUser>(
    `${urlname}/changeInfo`,
    (body, { rejectWithValue, dispatch }) => {
        const { _id, ...orther } = body;
        return axiosInstance.patch(`${urlname}/${_id}`, orther).then(res => {
            res.body = body;
            return res;
        }).catch(err => rejectWithValue(err?.response?.data));
    }
);

export const addressOrder = createAsyncThunk<ResponseAddress, { token?: string }>(
    `${urlname}/addressOrder`,
    (body, { rejectWithValue, dispatch }) => {
        axiosInstance.setHeaders({ 'x-food-access-token': body?.token });
        return axiosInstance.get('addressOrders?addressDefault=true').then(res => res[0]).catch(err => rejectWithValue(err?.response?.data));
    }
);
