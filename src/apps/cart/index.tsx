import ProductCartItem from "@app/apps/cart/components/Product-cart-item";
import { cartStore } from "@app/stores/cart";
import { useAppSelector, useDebounce, useSafeState } from "@app/stores/hooks";
import { Money, getCurrentLang } from "@app/utils/helper-function";
import BlurLayout from "@app/views/components/BlurLayout";
import { Fragment, useCallback, useEffect } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { removeItemFn, updateQuantity } from "./service";
import { productStore } from "@app/stores/product";
import { PRODUCT_DATA } from "@app/utils/types";
import Slider from "react-slick";
import ProductCard from "@app/views/components/ProductCard";
import { useTranslation } from "react-i18next";

const cartRootElement = document.getElementById("spero-app-cart");

function CartApp() {
    const lang = getCurrentLang()
    const { t } = useTranslation();
    const allProducts = useAppSelector(productStore);
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
            window.open(url, "_self");
        }
    };
    return cartRootElement ? (
        createPortal(
            <CartContainer>
                <div className="cart-count">
                    <p className="story_time">
            {t("YouHave")} <b>{count} {t("Product.Products")}</b> {t("Product.ProductInCart")}
                    </p>
                </div>
                {Boolean(count) && (
                    <BlurLayout loading={loading}>
                        <div className="cart-list-item">
                            <Scrollbars
                                style={{ height: Object.entries(items).length > 1 ? 520 : 260 }}
                            >
                                {Object.entries(items).map(([key, value]) => (
                                    <ProductCartItem
                                        itemData={{
                                            ...value,
                                            data: allProducts[value.product_id] as PRODUCT_DATA,
                                        }}
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
                                <span className="story_time my-auto">{t('Total')}:</span>
                                <h4 className="product_name_text my-auto">
                                    <b>{Money(total || "0")}</b>
                                </h4>
                            </div>
                            <div className="suggest-products mb-5">
                                <span className="offcanvas-title text-uppercase spero-text-primary">
                  {t("AlsoLike")}
                                </span>
                                <Slider
                                    dots
                                    infinite
                                    autoplay={true}
                                    autoplaySpeed={2000}
                                    speed={500}
                                    slidesToShow={2}
                                    slidesToScroll={1}
                                    responsive={[
                                        {
                                            breakpoint: 576,
                                            settings: {
                                                slidesToShow: 1,
                                            },
                                        },
                                    ]}
                                    customPaging={() => {
                                        return (
                                            <svg
                                                width="19"
                                                height="6"
                                                viewBox="0 0 19 6"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect width="19" height="6" rx="3" fill="#EFEFEF" />
                                            </svg>
                                        );
                                    }}
                                >
                                    {Object.entries(allProducts).map(([key, item]) => (
                                        <Fragment key={key}>
                                            <ProductCard product={item as PRODUCT_DATA} />
                                        </Fragment>
                                    ))}
                                </Slider>
                            </div>
                            <ButtonCart className="suggest-item">
                                <div className="checkoutBtnGroup receive_percent_btn d-flex justify-content-between flex-wrap my-3 w-100">
                                    <button
                                        onClick={handleNavigate}
                                        data-navigate="/san-pham"
                                        type="button"
                                        className="btn btn-outline fw-semibold w-100 w-md-48 mb-3"
                                    >
                    {t("ContinueShopping")}
                                    </button>
                                    <button
                                        onClick={handleNavigate}
                                        data-navigate={lang === 'vi' ? "/thanh-toan" : "/en/checkout"}
                                        type="button"
                                        className="btn btn-normal fw-semibold w-100 w-md-48 mb-3"
                                    >
                    {t("CheckOut")}
                                    </button>
                                </div>
                            </ButtonCart>
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
  @media only screen and (max-width: 480px) {
    .cart-list-item {
      padding-inline: 5px !important;
    }
    a.product_name_text {
      font-size: 1rem !important;
    }
    .product-cart-icon {
      padding: 0 !important;
    }
  }
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
  .product_name_text {
    font-size: 20px;
    line-height: 28px; /* 140% */
  }
  .product-cart-icon svg {
    width: 24px;
    height: 24px;
  }
  /* the slides */
  .slick-slide {
    padding: 0 10px;
  }
  .slick-dots {
    margin-top: 1rem;
    .slick-active rect {
      fill: var(--primary-1);
    }
  }
  margin-bottom: 130px;
  @media only screen and (max-width: 480px) {
    margin-bottom: 250px;
  }
`;
const ButtonCart = styled.div`
  background: #fff;
  position: fixed;
  bottom: 0;
  right: 0;
  width: calc(var(--bs-offcanvas-width) - 1px);
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;
