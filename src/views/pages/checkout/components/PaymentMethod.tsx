import { PAYMENT_GATEWAY } from "@app/utils/types";
import styled from "styled-components";

const PaymentMethod: React.FC<{
  formik: any;
  payment_geateways: PAYMENT_GATEWAY[]
}> = ({ formik, payment_geateways }) => {
    return (
        <form className="position-relative">
            {payment_geateways.map((item) => (
                <PaymentMethodStyled key={item.id}>
                    <input
                        id={item.id}
                        name="payment_method"
                        type="radio"
                        value={item.id}
                        onChange={formik.handleChange}
                        defaultChecked={formik.values.payment_method === item.id}
                    />
                    <label htmlFor={item.id}>{item.title}</label>
                </PaymentMethodStyled>
            ))}
            {formik.errors.payment_method && (
                <p className="errText">{formik.errors.payment_method}</p>
            )}
        </form>
    );
};

export default PaymentMethod;
const PaymentMethodStyled = styled.div`
  & ~ .errText {
    color: #ee3a3a;
  }
  user-select: none;
  &:not(:last-child) {
    margin-bottom: 24px;
  }
  label {
    cursor: pointer;
    display: inline;
    color: var(--neutral-1, #353131);
    font-size: 18px;
    font-weight: 500;
  }
  input {
    &[type="radio"] {
      position: relative;
      border: 2px solid #353131;
      border-radius: 2px;
      background: none;
      cursor: pointer;
      line-height: 0;
      margin: 0 0.6em 0 0;
      outline: 0;
      padding: 0 !important;
      vertical-align: text-top;
      height: 20px;
      width: 20px;
      -webkit-appearance: none;
      &:hover {
        opacity: 1;
      }
      &:checked {
        background-color: #3979c5;
        border: 2px solid #3979c5;
      }
      &:before {
        content: "";
        position: absolute;
        right: 50%;
        top: 50%;
        width: 8px;
        height: 14px;
        border: solid #fff;
        border-width: 0 3px 3px 0;
        margin: -1px -1px 0 -1px;
        transform: rotate(45deg) translate(-50%, -50%);
        z-index: 2;
      }
    }
  }
`;
