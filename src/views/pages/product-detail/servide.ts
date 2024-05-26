import { store } from "@app/stores";
import { setCart } from "@app/stores/cart";
import { SPERO_ACTION } from "@app/utils/constant";
import { objectBody } from "@app/utils/helper-function";
import { appRequest } from "@app/utils/request";
import React from "react";
import { toast } from "react-toastify";

export const addToCartFn = (
    quantity: number,
    product_id: string,
    variation_id: string,
    url: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    appRequest({
        url,
        method: "POST",
        body: objectBody({
            quantity,
            security: store.getState().SPERO_CART.update_order_review_nonce,
            action: SPERO_ACTION.ADD_TO_CART,
            product_id,
            variation_id,
        }),
        setLoading,
    //other options
    }).then((res) => {
        const cartAmountElement = document.getElementById("cart-quantity");
        if (cartAmountElement) {
            cartAmountElement.innerText = String(res.cart_data.count) || "0";
        }
        // console.log(res);
        store.dispatch(setCart(res.cart_data));
        toast.success("Thêm sản phẩm thành công!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            role: "alert",
        });
    });
};
