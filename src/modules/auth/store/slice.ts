/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as operations from './operations';
import { IUserGlobal } from '../screen/Function';
import { dataUser } from 'assets/data';

interface IUser {
    user?: IUserGlobal;
    isLogin: boolean;
}

const initialState: IUser = {
    user: dataUser,
    isLogin: true,
};

const user = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<IUser>) => {
            state.user = payload.user;
            state.isLogin = payload.isLogin;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(operations.login.pending, () => { });
        builder.addCase(operations.login.fulfilled, (state, { payload }) => {
            state.isLogin = true;
            state.user = payload;
        });
        builder.addCase(operations.login.rejected, () => { });
    },
});

export default user;
