import ProductCartItem from "@app/apps/cart/components/Product-cart-item";
import { cartStore } from "@app/stores/cart";
import { useAppSelector, useDebounce, useSafeState } from "@app/stores/hooks";
import { Money } from "@app/utils/helper-function";
import BlurLayout from "@app/views/components/BlurLayout";
import { useCallback, useEffect } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { removeItemFn, updateQuantity } from "./service";

const cartRootElement = document.getElementById("spero-app-cart");

function CartApp() {
  const navigate = useNavigate();
  const { count, items, total } = useAppSelector(cartStore);
  const [loading, setLoading] = useSafeState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useSafeState<{
    item_id: string;
    quantity: number;
  }>({ item_id: "", quantity: 1 });

  const handleRemove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      removeItemFn(setLoading)(String(e.currentTarget.dataset.itemkey || "0"));
    },
    [setLoading]
  );
  const debounceUpdate = useDebounce(itemUpdate);
  useEffect(() => {
    if (!(debounceUpdate.item_id === ""))
      updateQuantity(setLoading)(debounceUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceUpdate]);

  const handleNavigate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    document.getElementById("off-cart_toggle")?.click();
    const url = e.currentTarget.dataset.navigate!;
    if (location.pathname !== "/san-pham" || url !== "/san-pham") {
      navigate(url);
    }
  };

  return cartRootElement ? (
    createPortal(
      <CartContainer>
        <div className="cart-count">
          <p className="story_time">
            Bạn đang có <b>{count} sản phẩm</b> trong giỏ hàng
          </p>
        </div>
        {Boolean(count) && (
          <BlurLayout loading={loading}>
            <div className="cart-list-item">
              <Scrollbars style={{ height: 520 }}>
                {Object.entries(items).map(([key, value]) => (
                  <ProductCartItem
                    itemData={value}
                    key={key}
                    handle={{
                      remove: handleRemove,
                      update: setItemUpdate,
                    }}
                  />
                ))}
              </Scrollbars>
            </div>
            <div className="suggest-item">
              <div className="d-flex justify-content-between cart-total">
                <span className="story_time my-auto">Tổng tiền:</span>
                <h4 className="product_name_text my-auto">
                  <b>{Money(total || "0")}</b>
                </h4>
              </div>
              <div className="suggest-products ">
                <span className="offcanvas-title text-uppercase spero-text-primary">
                  Có thể bạn sẽ thích
                </span>
              </div>
              <div className="checkoutBtnGroup receive_percent_btn d-flex justify-content-between flex-wrap my-3">
                <button
                  onClick={handleNavigate}
                  data-navigate="/san-pham"
                  type="button"
                  className="btn btn-outline fw-semibold w-100 w-md-48 mb-3"
                >
                  Tiếp tục mua sắm
                </button>
                <button
                  onClick={handleNavigate}
                  data-navigate="/thanh-toan"
                  type="button"
                  className="btn btn-normal fw-semibold w-100 w-md-48 mb-3"
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </BlurLayout>
        )}
      </CartContainer>,
      cartRootElement
    )
  ) : (
    <></>
  );
}

export default CartApp;
const CartContainer = styled.div`
  .suggest-item,
  .cart-list-item {
    padding-inline: 44px;
  }
  .cart-total {
    margin-block: 36px;
  }
  .cart-list-item {
    padding-top: 8px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border-color);
  }
  .cart-count p {
    color: var(--neutral-text-2);
    padding: 24px 67px;
    margin-bottom: 0;
  }
  .cart-count {
    border-bottom: 1px solid var(--border-color);
  }
  .checkoutBtnGroup {
    .btn + .btn {
      margin-left: 0;
    }
  }
`;
