import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ProductApp from "./apps/product";
import i18n from "./i18n";
import "./index.css";
import { store } from "./stores";
import { setCart } from "./stores/cart";
import { setProduct } from "./stores/product";
import { ErrorBoundary } from "./views/components/ErrorBoundary";
import { getCurrentLang } from "./utils/helper-function";

const ListenLanguage = () => {
    useEffect(() => {
    }, []);
    const lang = getCurrentLang()
    i18n.changeLanguage(lang);
    return null;
};

document.addEventListener("DOMContentLoaded", () => {
    const rootElement = document.getElementById("spero-app");

    store.dispatch(setCart((window as any).__PRELOADED_DATA__.CART_DATA));
    store.dispatch(setProduct((window as any).__PRELOADED_DATA__.ALL_PRODUCT));

    // delete (window as any).__PRELOADED_DATA__;

    if (rootElement) {
        ReactDOM.createRoot(rootElement).render(
            <I18nextProvider i18n={i18n}>
                <ListenLanguage />
                <ErrorBoundary>
                    <Provider store={store}>
                        <ProductApp />
                    </Provider>
                </ErrorBoundary>
            </I18nextProvider>
        );
    }
});
