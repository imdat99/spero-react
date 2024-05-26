import { RootState } from "@app/stores";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export const namespace = "SPERO_COUNT";
const initialState: number = 0;

const slice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        setCount: (_, action: PayloadAction<number>) => action.payload,
        clearCout: () => initialState,
    },
});

export const { setCount, clearCout } = slice.actions;
export const countStore = (state: RootState) => state[namespace];
export const reducer = slice.reducer;
