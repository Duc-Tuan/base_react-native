/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ItemCart } from 'types/product-types';


interface State {
    carts: ItemCart[];
    penddingBuy: ItemCart[];
}

const initialState: State = {
    carts: [],
    penddingBuy: [],
};

const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        //
        addAndUpdateCarts: (state, { payload }: PayloadAction<ItemCart>) => {
            const findIndex = state.carts?.findIndex(i => i?.productId === payload?.productId);

            if (findIndex !== -1) {
                state.carts[findIndex] = payload;
            } else {
                state.carts = [...state.carts, payload];
            }
        },
        addAndUpdatePenddingBuy: (state, { payload }: PayloadAction<ItemCart>) => {
            const findIndex = state.carts?.findIndex(i => i?.productId === payload?.productId);

            if (findIndex !== -1) {
                state.carts[findIndex] = payload;
            } else {
                state.carts = [...state.carts, payload];
            }
        },
    },
});

export default cart;
