import { reRenderStore } from "@app/stores/forceRender";
import { useAppSelector, useSafeState } from "@app/stores/hooks";
import { Money } from "@app/utils/helper-function";
import { CART_ITEM } from "@app/utils/types";
import QuantityButton from "@app/views/components/QuantityButton";
import { isEmpty } from "lodash";
import { memo, useEffect } from "react";

const OrderRow: React.FC<{
  item: CART_ITEM;
  handle: {
    remove: (item_id: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    update: React.Dispatch<
      React.SetStateAction<{
        item_id: string;
        quantity: number;
      }>
    >;
  };
}> = memo(({ item, handle }) => {
    const {
        data: productData,
        variation,
        key: itemKey,
        quantity: itemQuantity,
    } = item;

    const triggerRender = useAppSelector(reRenderStore);
    const [quantity, setQuantity] = useSafeState<number>(itemQuantity);

    useEffect(() => {
        setQuantity(itemQuantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerRender]);
    useEffect(() => {
        if (!(quantity === itemQuantity)) {
            handle.update({ item_id: itemKey, quantity: quantity });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity]);
    return (
        <tr>
            <td className="product-col">
                <div className="product-info d-flex">
                    <div className="product-img checkout-img">
                        <img
                            src={productData.data.product_image_url.gallery_thumbnail_src}
                            alt={`${productData.data.product_name} - ${
                                !isEmpty(variation) && (Object.values(variation)[0] as string)
                            }`}
                        />
                    </div>
                    <div className="product-title">
                        <p>{productData.data.product_name}</p>
                        {!isEmpty(variation) && (
                            <span>{Object.values(variation)[0] as string}</span>
                        )}
                    </div>
                </div>
            </td>
            <td>{Money(item.data.data.price)}</td>
            <td className="quantity-col">
                <QuantityButton setQuantity={setQuantity} quantity={quantity} />
            </td>
            <td>
                <span>
                    <b>{Money(item.line_total)}</b>
                </span>
            </td>
            <td>
                <button className="btn" onClick={handle.remove} data-itemkey={itemKey}>
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
            </td>
        </tr>
    );
});

export default OrderRow;
