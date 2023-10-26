import CartApp from "@app/apps/cart";
import { store } from "@app/stores";
import { cartStore } from "@app/stores/cart";
import { useAppSelector } from "@app/stores/hooks";
import { setProduct } from "@app/stores/product";
import { adminAjax, PageUrl, SPERO_ACTION } from "@app/utils/constant";
import { objectBody } from "@app/utils/helper-function";
import { appRequest } from "@app/utils/request";
import { PRODUCT_DATA } from "@app/utils/types";
import AppSuspense from "@app/views/components/AppSuspense";
import CartEmpty from "@app/views/components/CartEmpty";
import CustomOutlet from "@app/views/components/CustomOutlet";
import Detail2 from "@app/views/pages/details2";
// import Products from "";
import { createElement as _c, FC, Fragment, lazy, useEffect } from "react";
import { createBrowserRouter, Outlet, useNavigate } from "react-router-dom";

const CheckCartPage: FC = () => {
  const Cart = useAppSelector(cartStore);
  const navigate = useNavigate();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (Cart.count) {
        navigate("/thanh-toan");
      }
    }, 0);
    return () => {
      clearTimeout(timeOut);
    };
  }, [Cart.count, navigate]);

  return _c(CartEmpty);
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: _c(Fragment, null, [
        _c(CartApp, { key: "dat.lt1" }),
        (window as any).__IS_404__
          ? _c("b", { key: "dat.lt2" })
          : _c(CustomOutlet, { key: "dat.lt2" }),
      ]),
      children: [
        {
          path: "san-pham",
          element: _c(Outlet),
          children: [
            {
              path: "",
              loader: () => {
                // return a;
                return appRequest({
                  url: PageUrl + "/wp-json/vendor/v/products",
                });
              },
              element: _c(AppSuspense, {comp: lazy(() => import("@app/views/pages/products"))}),
              // element: _c(CoffeeMap),
            },
            {
              path: ":slug",
              loader: async ({ params }) => {
                const productStore = store.getState()
                  .SPERO_PRODUCT as PRODUCT_DATA;
                if (productStore.slug !== params.slug) {
                  await appRequest({
                    url:
                      PageUrl +
                      "/wp-json/vendor/v/product-detail?slug=" +
                      params.slug,
                  }).then((val) => {
                    store.dispatch(setProduct(val));
                  });
                }
                return null;
              },
              element: _c(Outlet),
              children: [
                {
                  path: "",
                  element: _c(AppSuspense, {comp: lazy(() => import("@app/views/pages/product-detail/detail1"))}),
                },
                {
                  path: "more-info",
                  element: _c(Detail2),
                },
              ],
            },
          ],
        },
        {
          path: "thanh-toan",
          loader: async () => {
            return await appRequest({ url: adminAjax,
            method: "POST",
            body: objectBody({ action: SPERO_ACTION.CHECKOUT_INFO })})
          },
          element: _c(AppSuspense, {comp: lazy(() => import("@app/views/pages/checkout"))}),
        },
        {
          path: "info",
          element: _c(Detail2),
        },
        {
          path: "gio-hang",
          element: _c(CheckCartPage),
        },
        {
          path: "*",
          element: _c("b"),
        },
      ],
    },
  ],
  {
    // basename: "/san-pham",
    future: {
      v7_normalizeFormMethod: true,
    },
  }
);

export default router;