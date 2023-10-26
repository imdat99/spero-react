import { Outlet, useNavigation } from "react-router-dom";
import BlurLayout from "./BlurLayout";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "@app/stores/hooks";
import { cartStore } from "@app/stores/cart";
import { useEffect } from "react";
import { updateCartIcon } from "@app/utils/helper-function";

const CustomOutlet = () => {
  const { state } = useNavigation();
  const { count } = useAppSelector(cartStore);
  useEffect(() => {
    updateCartIcon(String(count));
  }, [count]);
  return (
    <>
      <ToastContainer role="alert" />
      <BlurLayout loading={state === "loading"}>
        <Outlet />
      </BlurLayout>
    </>
  );
};

export default CustomOutlet;
