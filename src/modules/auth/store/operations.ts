/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk<any>(
    'auth/login',
    (body, { rejectWithValue, dispatch }) => { }
);
