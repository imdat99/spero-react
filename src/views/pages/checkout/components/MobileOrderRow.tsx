import { reRenderStore } from "@app/stores/forceRender";
import { useAppSelector, useSafeState } from "@app/stores/hooks";
import { Money } from "@app/utils/helper-function";
import { CART_ITEM } from "@app/utils/types";
import QuantityButton from "@app/views/components/QuantityButton";
import { isEmpty } from "lodash";
import { FC, memo, useEffect } from "react";
import styled from "styled-components";

const MobileOrderRow: FC<{
  itemData: CART_ITEM;
  handle: {
    remove: (item_id: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    update: React.Dispatch<
      React.SetStateAction<{
        item_id: string;
        quantity: number;
      }>
    >;
  };
}> = memo(({ itemData, handle }) => {
    const {
        data: productData,
        variation,
        key: itemKey,
        quantity: itemQuantity,
    } = itemData;
    const triggerRender = useAppSelector(reRenderStore);
    const [quantity, setQuantity] = useSafeState<number>(itemQuantity);

    useEffect(() => {
        setQuantity(itemQuantity);
    }, [itemQuantity, setQuantity, triggerRender]);
    useEffect(() => {
        if (!(quantity === itemQuantity))
            handle.update({ item_id: itemKey, quantity: quantity });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity]);

    return (
        <CartItem className="d-flex">
            <div className="product-img checkout-img">
                <img
                    src={productData?.data.product_image_url.thumb_src}
                    alt={`${productData?.data.product_name} - ${
                        !isEmpty(variation) && (Object.values(variation)[0] as string)
                    }`}
                />
            </div>
            <CartInfo>
                <h4>
                    {productData?.data.product_name}
                    {!isEmpty(variation) &&
            " - " + (Object.values(variation)[0] as string)}
                </h4>
                <span className="spero__text">{Money(productData?.data.price)}</span>
                <div className="d-flex">
                    <QuantityButton setQuantity={setQuantity} quantity={quantity} />
                    <button
                        type="button"
                        className="remove-btn ms-5"
                        data-itemkey={itemKey}
                        onClick={handle.remove}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M18.75 5.25L5.25 18.75"
                                stroke="#9D9D9D"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M18.75 18.75L5.25 5.25"
                                stroke="#9D9D9D"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </CartInfo>
        </CartItem>
    );
});

export default MobileOrderRow;
const CartItem = styled.div`
  position: relative;
  border: 1px solid transparent;
  .remove-btn {
    margin-top: 8px;
    border: none;
    background-color: transparent;
    width: 28px;
    height: 28px;
    visibility: visible;
  }
  margin-block: 24px;

  padding-inline: 5px;
  .product-img {
    border-radius: 12px;
    max-width: 170px;
    img {
      border-radius: 12px;
    }
    margin-right: 34px;
    margin-bottom: 0;
  }
  &:not(:last-child) {
    padding-bottom: 10px;
    border-bottom: 1px solid var(--neutral-text-4, #c2c2c2);
  }
  @media only screen and (max-width: 480px) {
    h4 {
      font-size: 1rem;
    }
    .product-img {
      height: fit-content;
      border-radius: 12px;
      max-width: 80px;
      img {
        border-radius: 12px;
      }
      margin-right: 34px;
      margin-bottom: 0;
    }
  }
`;
const CartInfo = styled.div`
  & {
    h4 {
      color: var(--primary-1);
      font-size: 20px;
      font-weight: 500;
      line-height: 28px; /* 140% */
    }
    .spero__text {
      font-weight: 500;
    }
  }
  @media only screen and (max-width: 480px) {
    h4 {
      font-size: 1rem;
    }
  }
`;
