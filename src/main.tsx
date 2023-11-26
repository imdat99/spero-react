import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ProductApp from "./apps/product";
import "./index.css";
import { store } from "./stores";
import { setCart } from "./stores/cart";
import { setProduct } from "./stores/product";
import { ErrorBoundary } from "./views/components/ErrorBoundary";

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("spero-app");

  store.dispatch(setCart((window as any).__PRELOADED_DATA__.CART_DATA));
  store.dispatch(setProduct((window as any).__PRELOADED_DATA__.ALL_PRODUCT));

  // delete (window as any).__PRELOADED_DATA__;

  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <ErrorBoundary>
        <Provider store={store}>
          <ProductApp />
        </Provider>
      </ErrorBoundary>
    );
  }
});
