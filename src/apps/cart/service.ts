import { store } from "@app/stores";
import { setCart } from "@app/stores/cart";
import { reRender } from "@app/stores/forceRender";
import { SPERO_ACTION, adminAjax } from "@app/utils/constant";
import { buildQueryString, objectBody } from "@app/utils/helper-function";
import { appRequest } from "@app/utils/request";
import React from "react";

export const removeItemFn =
  (setLoading: React.Dispatch<React.SetStateAction<boolean>>) =>
      (item_id: string) => {
          appRequest({
              url: store.getState().SPERO_CART.ajaxUrl,
              method: "POST",
              body: objectBody({
                  action: SPERO_ACTION.REMOVE_ITEM,
                  cart_key: item_id,
              }),
              setLoading,
              //other options
          }).then((res) => {
              // console.log(res);
              store.dispatch(setCart(res.CART_DATA));
          });
      };

export const updateQuantity =
  (setLoading: React.Dispatch<React.SetStateAction<boolean>>) =>
      ({ item_id, quantity }: { item_id: string; quantity: number }) => {
          appRequest({
              url: adminAjax,
              method: "POST",
              body: objectBody({
                  security: store.getState().SPERO_CART.update_order_review_nonce,
                  action: SPERO_ACTION.UPDATE_ITEM,
                  update_data: buildQueryString({
                      item_id,
                      quantity,
                  }),
              }),
              setLoading,
              //other options
          })
              .then((res) => {
                  // console.log(res);
                  store.dispatch(setCart(res.CART_DATA));
              })
              .catch((e) => {
                  console.log(e);
                  store.dispatch(reRender());
              });
      };
