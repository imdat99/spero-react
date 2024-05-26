import { RootState } from "@app/stores";
import { PRODUCT_DATA } from "@app/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export const namespace = "SPERO_PRODUCT";
const initialState: Record<string, Partial<PRODUCT_DATA>> = {};

const slice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        setProduct: (
            _,
            action: PayloadAction<Record<string, Partial<PRODUCT_DATA>>>
        ) => action.payload,
        clearProduct: () => initialState,
    },
});

export const { setProduct, clearProduct } = slice.actions;
export const productStore = (state: RootState) =>
  state[namespace] as Record<string, Partial<PRODUCT_DATA>>;
export const reducer = slice.reducer;
