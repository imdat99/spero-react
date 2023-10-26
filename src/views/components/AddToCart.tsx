import styled, { keyframes } from "styled-components";
import { FC } from "react";
const AddToCartbtn: FC<{
  onClick: (p: any) => void;
  loading: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ onClick, loading, children, className }) => {
  return (
    <ButtonStyled
      type="button"
      className={className || "btn btn-normal fw-semibold position-relative"}
      onClick={onClick}
      disabled={loading}
    >
      <LoadingSpinner $loading={loading} />
      <ButtonText $loading={loading}>{children}</ButtonText>
    </ButtonStyled>
  );
};

export default AddToCartbtn;

const ButtonStyled = styled.button`
  &:disabled {
    background-color: var(--primary-2);
  }
`;

const ButtonText = styled.span<{ $loading: boolean }>`
  transition: opacity 200ms;
  transition-delay: ${({ $loading }) => ($loading ? "0ms" : "200ms")};
  width: 100%;
  opacity: ${({ $loading }) => ($loading ? 0 : 1)};
`;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }`;

const LoadingSpinner = styled.div<{ $loading: boolean }>`
  border: 4px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  border-top-color: white;
  opacity: ${({ $loading }) => ($loading ? 1 : 0)};
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  width: 16px;
  height: 16px;
  transition: opacity 200ms;
  animation: ${rotate} 1s linear;
  animation-iteration-count: infinite;
  transition-delay: ${({ $loading }) => ($loading ? "200ms" : "0ms")};
`;
