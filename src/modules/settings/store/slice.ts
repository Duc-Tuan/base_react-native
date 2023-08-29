/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Colors from 'themes/Color';

interface ISettings {
    colorPrimary: string;
}

const initialState: ISettings = {
    colorPrimary: Colors.primary,
};

const settings = createSlice({
    name: 'Settings',
    initialState,
    reducers: {
        setColor: (state, { payload }: PayloadAction<ISettings>) => {
            state.colorPrimary = payload.colorPrimary;
        },
    },
});

export default settings;
