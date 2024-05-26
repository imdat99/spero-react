import { RootState } from "@app/stores";
import { createSlice } from "@reduxjs/toolkit";
export const namespace = "FORCE_RERENDER";
const initialState: boolean = false;

const slice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        reRender: (state) => !state,
    },
});

export const { reRender } = slice.actions;
export const reRenderStore = (state: RootState) => state[namespace] as boolean;
export const reducer = slice.reducer;
