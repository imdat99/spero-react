import { useEffect, useState } from "react";
import styled from "styled-components";

const LocalToast = ({ show }: { show: boolean }) => {
  const [isShow, setShow] = useState<boolean>(show);
  useEffect(() => {
    const toastTimeout = isShow ? setTimeout(() => setShow(false), 2500) : 1999;
    return () => {
      clearTimeout(toastTimeout);
    };
  }, [isShow]);

  return !isShow ? (
    <></>
  ) : (
    <ToastStyled
      className="toast align-items-center text-bg-success border-0 fade show"
      role="alert"
    >
      <div className="d-flex">
        <div className="toast-body">Sản phẩm đã được thêm thành công!</div>
        <button
          onClick={() => {
            setShow(false);
          }}
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          aria-label="Close"
        ></button>
      </div>
    </ToastStyled>
  );
};

export default LocalToast;

const ToastStyled = styled.div`
  position: fixed;
  top: 10%;
  right: 3%;
`;
