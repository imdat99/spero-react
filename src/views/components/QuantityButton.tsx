import { BUTTON_TYPE } from "@app/utils/constant";
import React, { useCallback } from "react";
import styled from "styled-components";

const QuantityButton: React.FC<{
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  quantity: number;
}> = ({ setQuantity, quantity }) => {
    const handleQuantity = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const buttonType = e.currentTarget.dataset.type;
            if (String(buttonType) === BUTTON_TYPE.INCREASE) {
                setQuantity((prev) => Number(prev) + 1);
            }
            if (String(buttonType) === BUTTON_TYPE.MINUS)
                setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
        },
        [setQuantity]
    );

    return (
        <QuantityContainer className="d-flex text-center">
            <button data-type={BUTTON_TYPE.MINUS} onClick={handleQuantity}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="2"
                    viewBox="0 0 12 2"
                    fill="none"
                >
                    <path
                        d="M1 1H11"
                        stroke="#717171"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
            <input type="text" readOnly value={quantity} />
            <button data-type={BUTTON_TYPE.INCREASE} onClick={handleQuantity}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                >
                    <path
                        d="M1 6H11"
                        stroke="#717171"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M6 11L6 1"
                        stroke="#717171"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
        </QuantityContainer>
    );
};

export default QuantityButton;
const QuantityContainer = styled.div`
      font-size: 18px !important;
      color: var(--neutral-text-2);
      margin-top: 8px;
      button,
      input {
        user-select: none;
        outline: none;
        border: none;
        font-weight: 500;
      }
      button {
        padding: 0
        color: var(--neutral-text-2);
        background-color: transparent;
        /* background: $color--primary; */
        /* color: $modifier--text-color; */
        border: none;
        text-align: center;

        cursor: pointer;
      }
      input {
        color: var(--neutral-text-2);
        width: 4rem;
        text-align: center;
      }
`;
