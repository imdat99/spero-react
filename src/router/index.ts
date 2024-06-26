import CartApp from "@app/apps/cart";
import SperoSearch from "@app/apps/search";
import { cartStore } from "@app/stores/cart";
import { useAppSelector } from "@app/stores/hooks";
import { adminAjax, PageUrl, SPERO_ACTION } from "@app/utils/constant";
import { getCurrentLang, objectBody } from "@app/utils/helper-function";
import { appRequest } from "@app/utils/request";
import CartEmpty from "@app/views/components/CartEmpty";
import CustomOutlet from "@app/views/components/CustomOutlet";
import { ErrorBoundary } from "@app/views/components/ErrorBoundary";
import Checkout from "@app/views/pages/checkout";
import Detail2 from "@app/views/pages/details2";
import Home from "@app/views/pages/home";
import EthioHome from "@app/views/pages/home/ethio";
import VietnamHome from "@app/views/pages/home/vietnam";
import Detail1 from "@app/views/pages/product-detail/detail1";
import Products from "@app/views/pages/products";
import { createElement as _c, FC, Fragment, useEffect } from "react";
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

const ErrorCheck = (Comp: () => JSX.Element) => {
    return _c(ErrorBoundary, { children: _c(Comp) });
};

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: _c(Fragment, null, [
                _c(SperoSearch, { key: Math.random() }),
                _c(EthioHome, { key: Math.random() }),
                _c(VietnamHome, { key: Math.random() }),
                _c(Home, { key: Math.random() }),
                _c(CartApp, { key: Math.random() }),
                (window as any).__IS_404__
                    ? _c("b", { key: Math.random() })
                    : _c(CustomOutlet, { key: Math.random() }),
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
                                    url: PageUrl + "/wp-json/vendor/v/products?lang="+getCurrentLang(),
                                });
                            },
                            element: ErrorCheck(Products),
                            // element: _c(CoffeeMap),
                        },
                        {
                            path: ":slug",
                            element: _c(Outlet),
                            children: [
                                {
                                    path: "",
                                    element: ErrorCheck(Detail1),
                                },
                            ],
                        },
                    ],
                },
                {
                    path: "en/san-pham",
                    element: _c(Outlet),
                    children: [
                        {
                            path: "",
                            loader: () => {
                                // return a;
                                return appRequest({
                                    url: PageUrl + "/wp-json/vendor/v/products?lang="+getCurrentLang(),
                                });
                            },
                            element: ErrorCheck(Products),
                            // element: _c(CoffeeMap),
                        },
                        {
                            path: ":slug",
                            element: _c(Outlet),
                            children: [
                                {
                                    path: "",
                                    element: ErrorCheck(Detail1),
                                },
                            ],
                        },
                    ],
                },
                {
                    path: "thanh-toan",
                    loader: async () => {
                        return await appRequest({
                            url: adminAjax,
                            method: "POST",
                            body: objectBody({ action: SPERO_ACTION.CHECKOUT_INFO }),
                        });
                    },
                    element: ErrorCheck(Checkout),
                },
                {
                    path: "en/checkout",
                    loader: async () => {
                        return await appRequest({
                            url: adminAjax,
                            method: "POST",
                            body: objectBody({ action: SPERO_ACTION.CHECKOUT_INFO }),
                        });
                    },
                    element: ErrorCheck(Checkout),
                },
                {
                    path: "info",
                    element: ErrorCheck(Detail2),
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
        future: {
            v7_normalizeFormMethod: true,
        },
    }
);



export default router;
