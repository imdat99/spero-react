import { Money } from "@app/utils/helper-function";
import styled from "styled-components";

const Prices = ({
    totalAmount,
}: {
  totalAmount: {
    total: string;
    shipping_total: string;
    checkout_total: string;
    discount_total: string;
  };
}) => {
    return (
        <PriceTable>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th colSpan={1}>
                                <span>Tổng tiền</span>
                            </th>
                            <td colSpan={1}>
                                <span>
                                    <strong>{Money(totalAmount.total)}</strong>
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <th colSpan={1}>
                                <span>Phí giao hàng</span>
                            </th>
                            <td colSpan={1}>
                                <span>
                                    <strong>
                                        {totalAmount.shipping_total !== "0"
                                            ? Money(totalAmount.shipping_total)
                                            : "Miễn phí"}
                                    </strong>
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <th colSpan={1}>
                                <span>Khuyến mãi</span>
                            </th>
                            <td colSpan={1}>
                                <span>
                                    <strong>{Money(totalAmount.discount_total)}</strong>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2}>
                                <ol className="shipping-info" style={{}}>
                                    <li>
                    Áp dụng <b>MIỄN PHÍ GIAO HÀNG</b> cho đơn hàng nội thành Hà
                    Nội.
                                    </li>
                                    <li>
                    Đối với đơn ngoại thành, Quý khách vui lòng để lại thông tin
                    liên hệ để Spero xác nhận thông tin và thông báo phí giao
                    hàng.
                                    </li>
                                </ol>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th colSpan={1}>
                                <span className="price-total">Tổng tiền</span>
                            </th>
                            <td colSpan={1}>
                                <span className="price-total__amount">
                                    <strong>{Money(totalAmount.checkout_total)}</strong>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2}>
                                <p className="vat-info">(VAT included)</p>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </PriceTable>
    );
};

export default Prices;
const PriceTable = styled.div`
  .shipping-info {
    color: var(--neutral-text-2);
    text-align: left;
    font-size: 16px;
  }
  table {
    width: 100%;
    tr th span,
    tr td span {
      color: var(--primary-1);
      font-size: 18px;
      font-weight: 400;
    }
    td {
      text-align: right;
    }
    tfoot {
      td {
        text-align: left;
      }
    }
  }
  div {
    border: 1px solid var(--divider-mercury, #e1e1e1);
    border-radius: 20px;
    padding: 24px;
    &:last-child {
      margin-top: 2rem;
    }
    &:first-child {
      tbody {
        tr:not(:last-child) {
          border-bottom: 1px solid var(--divider-mercury, #e1e1e1);
        }
        th,
        td {
          padding-block: 20px;
        }
      }
    }
  }
  &:last-child {
    .vat-info {
      text-align: right;
      font-size: 14px;
      color: var(--neutral-text-2, #717171);
    }
    .payment-total__amount {
      font-size: 20px;
    }
  }
  .story_time {
    color: var(--primary-1);
  }
  .payment-total {
    font-weight: 500;
  }
`;
