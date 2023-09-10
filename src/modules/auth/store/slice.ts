/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as operations from './operations';
import { IUser } from 'types/auth-types';

interface IUserStore {
    user?: IUser;
    isLogin: boolean;
}

const initialState: IUserStore = {
    user: undefined,
    isLogin: false,
};

const user = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<IUserStore>) => {
            state.isLogin = payload.isLogin;
            state.user = payload.user;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(operations.login.pending, () => { });
        builder.addCase(operations.login.fulfilled, (state, { payload }) => {
            state.isLogin = true;
            // console.log(payload);
            state.user = payload.data;
        });
        builder.addCase(operations.login.rejected, () => { });
        builder.addCase(operations.logout.pending, () => { });
        builder.addCase(operations.logout.fulfilled, (state) => {
            state.isLogin = false;
            state.user = undefined;
        });
        builder.addCase(operations.logout.rejected, () => { });
        builder.addCase(operations.changeInfo.pending, () => { });
        builder.addCase(operations.changeInfo.fulfilled, (state, { payload }) => {
            const { body } = payload;
            state.user = body;
        });
        builder.addCase(operations.changeInfo.rejected, () => { });
    },
});

export default user;
