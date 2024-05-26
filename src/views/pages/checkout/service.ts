import { store } from "@app/stores";
import React from "react";
import { objectBody } from "@app/utils/helper-function";
import { appRequest } from "@app/utils/request";
import { SPERO_CART } from "@app/utils/types";
import { PageUrl } from "@app/utils/constant";
import { refreshCart } from "@app/stores/cart";
import { toast } from "react-toastify";

export const checkoutFn =
  (setLoading: React.Dispatch<React.SetStateAction<boolean>>) =>
      (checkoutData: Record<string, string>) => {
          const cartData = store.getState().SPERO_CART as SPERO_CART;
          appRequest({
              url: PageUrl + "/?wc-ajax=checkout",
              method: "POST",
              setLoading,
              body: objectBody({
                  "woocommerce-process-checkout-nonce":
          cartData["woocommerce-process-checkout-nonce"],
                  "shipping_method[0]": cartData.shipping_method_id,
                  ...Object.fromEntries(
                      Object.entries(cartData.items).map(([key, val]) => [
                          `cart[${key}][qty]`,
                          val.quantity,
                      ])
                  ),
                  ...checkoutData,
              }),
          }).then((res) => {
              // console.log("first", res);
              if (res.result === "success") {
                  window.open(res.redirect, "_self");
              }
              if (res.result === "failure") {
                  toast.error("Xin lỗi, phiên truy cập của bạn đã kết thúc!", {
                      role: "alert",
                      position: toast.POSITION.BOTTOM_RIGHT,
                  });
                  store.dispatch(refreshCart());
              }
          });
      };
