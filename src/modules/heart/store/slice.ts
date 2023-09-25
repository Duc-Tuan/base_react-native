/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as operations from './operations';

interface State {
    hearts: string[];
}

const initialState: State = {
    hearts: [],
};

const heart = createSlice({
    name: 'Hearts',
    initialState,
    reducers: {
        addAndUpdateCarts: (state, { payload }: PayloadAction<{ id: string | number; }>) => {
            const dataOld: string[] = [...state.hearts];
            const isCheck = dataOld?.some((i: string) => i?.toString() === payload?.id?.toString());
            if (isCheck) {
                const dataNew: string[] = dataOld?.filter((i: string) => i?.toString() !== payload?.id?.toString());
                state.hearts = dataNew;
            } else {
                state.hearts = [String(payload?.id), ...dataOld];
            }
        },
    },
    extraReducers: (builder) => {
        //danh sách sản phảm ưa thích
        builder.addCase(operations.getHearts.pending, () => { });
        builder.addCase(operations.getHearts.fulfilled, (state, { payload }) => {
            const { heart_content } = payload;
            state.hearts = heart_content;
        });
        builder.addCase(operations.getHearts.rejected, () => { });
        //Cập nhật sản phẩm ưa thích
        builder.addCase(operations.postHearts.pending, () => { });
        builder.addCase(operations.postHearts.fulfilled, (state, { payload }) => {
            console.log(payload);
        });
        builder.addCase(operations.postHearts.rejected, () => { });
    }
});

export default heart;
