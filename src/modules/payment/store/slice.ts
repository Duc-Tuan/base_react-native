/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPayments } from 'types/cart-types';
import * as operations from './operations';

interface State {
    penddingBuy: IPayments[];
}

const initialState: State = {
    penddingBuy: [],
};

const payment = createSlice({
    name: 'pay',
    initialState,
    reducers: {
        addPayments: (state, { payload }: PayloadAction<IPayments[] | []>) => {
            state.penddingBuy = payload;
        },
    },
    extraReducers: (builder) => {
        //Thêm đơn hàng
        builder.addCase(operations.getPay.pending, () => { });
        builder.addCase(operations.getPay.fulfilled, (state, { payload }) => {
            // console.log(payload);
        });
        builder.addCase(operations.getPay.rejected, () => { });
    }
});

export default payment;
