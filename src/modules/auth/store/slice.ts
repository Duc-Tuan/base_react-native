/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILocation } from 'assets/data';
import { IUser } from 'types/auth-types';
import * as operations from './operations';

interface IUserStore {
    user?: IUser;
    isLogin: boolean;
    addressOrder?: ILocation;
}

const initialState: IUserStore = {
    user: undefined,
    isLogin: false,
    addressOrder: undefined,
};

const user: any = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<IUserStore>) => {
            state.isLogin = payload.isLogin;
            state.user = payload.user;
        },
        update: (state, { payload }: PayloadAction<IUser>) => {
            state.user = payload;
        },
        updateLocation: (state, { payload }: PayloadAction<ILocation>) => {
            state.addressOrder = payload;
        },
    },
    extraReducers: (builder) => {
        //Đăng nhập
        builder.addCase(operations.login.pending, () => { });
        builder.addCase(operations.login.fulfilled, (state, { payload }) => {
            state.isLogin = true;
            state.user = payload.data;
        });
        builder.addCase(operations.login.rejected, () => { });
        //Đăng xuất
        builder.addCase(operations.logout.pending, () => { });
        builder.addCase(operations.logout.fulfilled, (state) => {
            state.isLogin = false;
            state.user = undefined;
        });
        builder.addCase(operations.logout.rejected, () => { });
        //update thông tin người dùng
        builder.addCase(operations.changeInfo.pending, () => { });
        builder.addCase(operations.changeInfo.fulfilled, (state, { payload }) => {
            const { body } = payload;
            state.user = body;
        });
        builder.addCase(operations.changeInfo.rejected, () => { });
        //Địa chỉ mặc định
        builder.addCase(operations.addressOrder.pending, () => { });
        builder.addCase(operations.addressOrder.fulfilled, (state, { payload }) => {
            state.addressOrder = payload;
        });
        builder.addCase(operations.addressOrder.rejected, () => { });
    },
});

export default user;
