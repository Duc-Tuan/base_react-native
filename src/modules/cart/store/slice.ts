/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemCart } from 'modules/auth/screen/Function';
import * as operations from './operations';
import { ICartsData } from 'types/cart-types';
import { cloneDeep } from 'lodash';

interface State {
    carts: ICartsData[] | [];
    penddingBuy: ItemCart[];
}

const initialState: State = {
    carts: [],
    penddingBuy: [],
};

const cart = createSlice({
    name: 'Carts',
    initialState,
    reducers: {
        addAndUpdateCarts: (state, { payload }: PayloadAction<ICartsData>) => {
            const findIndex = state.carts?.findIndex((i: ICartsData) => i?._id === payload?._id);

            if (findIndex !== -1) {
                state.carts[findIndex] = payload;
            } else {
                state.carts = [...state.carts, payload];
            }
        },
        addCarts: (state, { payload }: PayloadAction<ICartsData>) => {
            const findIndex = state.carts?.findIndex((i: ICartsData) => i?._id === payload?._id);

            if (findIndex !== -1) {
                const dataOld = cloneDeep(state.carts[findIndex]);
                dataOld.qty += payload?.qty;
                state.carts[findIndex] = dataOld;
            } else {
                state.carts = [...state.carts, payload];
            }
        },
        deletCarts: (state, { payload }: PayloadAction<{ id: string | number }>) => {
            const dataOld: ICartsData[] = cloneDeep(state.carts);
            const dataNew = dataOld?.filter((i: ICartsData) => i?._id !== payload?.id);
            state.carts = dataNew;
        },
        addAndUpdatePenddingBuy: (state, { payload }: PayloadAction<ICartsData>) => {
            const findIndex = state.carts?.findIndex(i => i?.productId === payload?.productId);

            if (findIndex !== -1) {
                state.carts[findIndex] = payload;
            } else {
                state.carts = [...state.carts, payload];
            }
        },
    },
    extraReducers: (builder) => {
        //danh sách giỏ hàng
        builder.addCase(operations.getCarts.pending, () => { });
        builder.addCase(operations.getCarts.fulfilled, (state, { payload }) => {
            const { cartdata } = payload;
            state.carts = cartdata;
        });
        builder.addCase(operations.getCarts.rejected, () => { });
        //thêm giỏ hàng
        builder.addCase(operations.postCarts.pending, () => { });
        builder.addCase(operations.postCarts.fulfilled, () => { });
        builder.addCase(operations.postCarts.rejected, () => { });
        //xóa sản phẩm trong giỏ hàng
        builder.addCase(operations.deleteCarts.pending, () => { });
        builder.addCase(operations.deleteCarts.fulfilled, () => { });
        builder.addCase(operations.deleteCarts.rejected, () => { });
    }
});

export default cart;
