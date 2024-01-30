import { reRenderStore } from "@app/stores/forceRender";
import { useAppSelector, useSafeState } from "@app/stores/hooks";
import { Money } from "@app/utils/helper-function";
import { CART_ITEM } from "@app/utils/types";
import QuantityButton from "@app/views/components/QuantityButton";
import { isEmpty } from "lodash";
import { FC, memo, useEffect } from "react";
import styled from "styled-components";

const ProductCartItem: FC<{
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
      <button
        type="button"
        className="remove-btn"
        data-itemkey={itemKey}
        onClick={handle.remove}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="14" cy="14" r="13.5" fill="white" stroke="#B6B6B6" />
          <path
            d="M8.25176 8.25176C8.33137 8.17196 8.42593 8.10864 8.53004 8.06544C8.63416 8.02224 8.74577 8 8.85849 8C8.97121 8 9.08282 8.02224 9.18693 8.06544C9.29104 8.10864 9.38561 8.17196 9.46521 8.25176L14.0002 12.7885L18.5352 8.25176C18.6149 8.17209 18.7095 8.10888 18.8136 8.06576C18.9177 8.02264 19.0293 8.00045 19.142 8.00045C19.2546 8.00045 19.3662 8.02264 19.4703 8.06576C19.5744 8.10888 19.669 8.17209 19.7487 8.25176C19.8284 8.33144 19.8916 8.42603 19.9347 8.53013C19.9778 8.63423 20 8.74581 20 8.85849C20 8.97117 19.9778 9.08274 19.9347 9.18685C19.8916 9.29095 19.8284 9.38554 19.7487 9.46521L15.212 14.0002L19.7487 18.5352C19.8284 18.6149 19.8916 18.7095 19.9347 18.8136C19.9778 18.9177 20 19.0293 20 19.142C20 19.2546 19.9778 19.3662 19.9347 19.4703C19.8916 19.5744 19.8284 19.669 19.7487 19.7487C19.669 19.8284 19.5744 19.8916 19.4703 19.9347C19.3662 19.9778 19.2546 20 19.142 20C19.0293 20 18.9177 19.9778 18.8136 19.9347C18.7095 19.8916 18.6149 19.8284 18.5352 19.7487L14.0002 15.212L9.46521 19.7487C9.38554 19.8284 9.29095 19.8916 9.18685 19.9347C9.08274 19.9778 8.97117 20 8.85849 20C8.74581 20 8.63423 19.9778 8.53013 19.9347C8.42603 19.8916 8.33144 19.8284 8.25176 19.7487C8.17209 19.669 8.10888 19.5744 8.06576 19.4703C8.02264 19.3662 8.00045 19.2546 8.00045 19.142C8.00045 19.0293 8.02264 18.9177 8.06576 18.8136C8.10888 18.7095 8.17209 18.6149 8.25176 18.5352L12.7885 14.0002L8.25176 9.46521C8.17196 9.38561 8.10864 9.29104 8.06544 9.18693C8.02224 9.08282 8 8.97121 8 8.85849C8 8.74577 8.02224 8.63416 8.06544 8.53004C8.10864 8.42593 8.17196 8.33137 8.25176 8.25176Z"
            fill="#B6B6B6"
          />
        </svg>
      </button>
      <div className="product-img">
        <img
          src={productData.data.product_image_url.thumb_src}
          alt={`${productData.data.product_name} - ${
            !isEmpty(variation) && (Object.values(variation)[0] as string)
          }`}
        />
      </div>
      <CartInfo>
        <h4>
          {productData.data.product_name}{" "}
          {!isEmpty(variation) &&
            "- " + (Object.values(variation)[0] as string)}
        </h4>
        <span className="spero__text">{Money(productData.data.price)}</span>
        <QuantityButton setQuantity={setQuantity} quantity={quantity} />
      </CartInfo>
    </CartItem>
  );
});

export default ProductCartItem;
const CartItem = styled.div`
  border-radius: 10px;
  position: relative;
  border: 1px solid transparent;
  .remove-btn {
    top: -16px;
    right: 65px;
    position: absolute;
    border: none;
    background-color: transparent;
    width: 28px;
    height: 28px;
    visibility: hidden;
  }
  &:hover {
    border: 1px solid var(--neutral-text-4, #b6b6b6);
    .remove-btn {
      visibility: visible;
    }
  }
  margin-top: 24px;
  padding: 14px 23px;
  .product-img {
    border-radius: 12px;
    max-width: 170px;
    img {
      border-radius: 12px;
    }
    margin-right: 34px;
    margin-bottom: 0;
  }
  @media only screen and (max-width: 480px) {
    & {
      padding: 14px 5px;
    }
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
