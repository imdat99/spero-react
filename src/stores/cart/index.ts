import { RootState } from "@app/stores";
import { SPERO_CART } from "@app/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export const namespace = "SPERO_CART";
const initialState: Partial<SPERO_CART> = {};

const slice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        setCart: (_, action: PayloadAction<Partial<SPERO_CART>>) => action.payload,
        refreshCart: () =>
            ({
                items: [],
                total: 0,
                shipping_total: 0,
                checkout_total: 0,
                discount_total: 0,
                count: 0,
            } as any),
        clearCart: () => initialState,
    },
});

export const { setCart, clearCart, refreshCart } = slice.actions;
export const cartStore = (state: RootState) => state[namespace] as SPERO_CART;
export const reducer = slice.reducer;
