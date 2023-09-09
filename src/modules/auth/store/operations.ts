/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import * as axiosInstance from 'store/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseAuthen } from 'types/auth-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IFormLogin } from '../screen/Function';
import NavigationService from 'naviagtion/stack/NavigationService';
import { PathName } from 'configs';

export const login = createAsyncThunk<ResponseAuthen, IFormLogin>(
    'auths/login',
    (body, { rejectWithValue, dispatch }) => {
        return axiosInstance.post('auths/login', body).then(res => {
            if (res?.status) {
                AsyncStorage.setItem('token', res?.token);
            }
            return res;
        }).catch(err => rejectWithValue(err?.response?.data));
    }
);

export const autologin = createAsyncThunk<ResponseAuthen, IFormLogin>(
    'auths/login',
    (body, { rejectWithValue, dispatch }) => {
        return axiosInstance.post('auths/login').then(res => {
            if (res?.status) {
                AsyncStorage.setItem('token', res?.token);
            }
            return res;
        }).catch(err => rejectWithValue(err?.response?.data));
    }
);

export const logout = createAsyncThunk('auths/logout', async () => {
    try {
        await Promise.all([
            AsyncStorage.removeItem('token'),
            axiosInstance.setHeaders({ 'x-food-access-token': '' }),
            NavigationService.reset(PathName.SETTINGSCREEN),
        ]);
    } catch (error) { }
    return true;
});
