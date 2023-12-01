import { CART_ITEM, PRODUCT_DATA } from "@app/utils/types";
import styled from "styled-components";
import OrderRow from "./OrderRow";
import { FC, Fragment, useCallback, useEffect } from "react";
import { Money } from "@app/utils/helper-function";
import { useAppSelector, useDebounce, useSafeState } from "@app/stores/hooks";
import { removeItemFn, updateQuantity } from "@app/apps/cart/service";
import BlurLayout from "@app/views/components/BlurLayout";
import { productStore } from "@app/stores/product";
import useWindowSize from "@app/utils/useWindowSize";
import MobileOrderRow from "./MobileOrderRow";

const OrderReview: FC<{
  items: Record<string, CART_ITEM>;
  total: string;
}> = ({ items, total }) => {
  const { width } = useWindowSize();
  const [loading, setLoading] = useSafeState<boolean>(false);
  const allProducts = useAppSelector(productStore);
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

  return (
    <BlurLayout loading={loading}>
      {width > 575 ? (
        <TableStyled>
          <thead>
            <tr>
              <th className="product-col">Sản phẩm</th>
              <th className="price-col">Giá</th>
              <th className="quantity-col">Số lượng</th>
              <th className="total-col">Tổng cộng</th>
              <th className="action-col">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(items).map(([, item]) => (
              <Fragment key={item.key}>
                <OrderRow
                  item={{
                    ...item,
                    data: allProducts[item.product_id] as PRODUCT_DATA,
                  }}
                  handle={{
                    remove: handleRemove,
                    update: setItemUpdate,
                  }}
                />
              </Fragment>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="product-col">
                <span className="review-total__span">Tổng tiền:</span>
              </td>
              <td colSpan={3} className="total-amount-col">
                <span className="review-total__amount">{Money(total)}</span>
              </td>
              <td>&nbsp;</td>
            </tr>
          </tfoot>
        </TableStyled>
      ) : (
        <MobilePreview>
          {Object.entries(items).map(([key, value]) => (
            <MobileOrderRow
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
        </MobilePreview>
      )}
    </BlurLayout>
  );
};

export default OrderReview;
const MobilePreview = styled.div`
  width: 100%;
`;
const TableStyled = styled.table`
  thead {
    border-bottom: 1px solid var(--border-color-2);
  }
  th,
  td {
    padding-block: 1rem;
    text-align: center;
  }
  th {
    color: var(--neutral-1, #353131);
    font-size: 18px;
    font-weight: 600;
    line-height: 26px; /* 144.444% */
  }
  .product-col {
    width: 40%;
    text-align: left;
  }
  .total-amount-col {
    text-align: right;
    padding-right: 1rem;
  }
  .review-total {
    &__span {
      color: var(--neutral-text-2);
      font-size: 20px;
      font-weight: 500;
    }
    &__amount {
      color: var(--primary-1);
      font-size: 30px;
      font-weight: 600;
      line-height: 42px; /* 140% */
    }
  }
  .action-col {
    width: 26px;
  }
  .quantity-col > div {
    justify-content: center;
  }
  .product-title {
    p,
    span {
      color: var(--primary-1);
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px; /* 150% */
      margin-bottom: 0px;
    }
    span {
      padding: 5px;
      border-radius: 3px;
      background-color: var(--img-bg-color);
    }
  }
  .product-img {
    border-radius: 10px;
    margin-bottom: 0px;
    margin-right: 10px;
  }
`;
