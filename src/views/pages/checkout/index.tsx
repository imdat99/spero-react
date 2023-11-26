import { cartStore } from "@app/stores/cart";
import { useAppSelector } from "@app/stores/hooks";
import { PAYMENT_GATEWAY, PROVINCE } from "@app/utils/types";
import AddToCartbtn from "@app/views/components/AddToCart";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import * as yup from "yup";
import CheckoutForm from "./components/CheckoutForm";
import Coupon from "./components/Coupon";
import OrderReview from "./components/OrderReview";
import PaymentMethod from "./components/PaymentMethod";
import Prices from "./components/Prices";
import { checkoutFn } from "./service";
import "./test.scss";
import { getData_diagioi_fromId } from "@app/utils/helper-function";

// import { useReactTable } from '@tanstack/react-table'

const schema = yup.object({
  billing_first_name: yup.string().required("Họ và tên không được để trống!"),
  billing_phone: yup
    .string()
    .required("Số điện thoại không được để trống!")
    .matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
      "Số điện thoại không đúng định dạng!"
    ),
  billing_city: yup.string().required("Thành phố không được để trống!"),
  billing_address_2: yup.string().required("Địa chỉ không được để trống!"),
  billing_email: yup
    .string()
    .required("Email không được để trống!")
    .matches(
      /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      "Địa chỉ email sai định dạng!"
    ),
  billing_address_1: yup.string().required("Quận huyện không được để trống!"),
  payment_method: yup
    .string()
    .required("Vui lòng lựa chọn phương thức thanh toán!"),
});

const initialValues = {
  billing_first_name: "",
  billing_country: "VN",
  billing_phone: "",
  billing_city: "",
  billing_address_1: "",
  billing_address_2: "",
  billing_email: "",
  order_comments: "",
  payment_method: "cod",
};

const Checkout = () => {
  const {
    items,
    total,
    count,
    shipping_total,
    checkout_total,
    discount_total,
  } = useAppSelector(cartStore);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { diaGioiVn, payment_geateways } = useLoaderData() as Record<
    string,
    PROVINCE[] & PAYMENT_GATEWAY[]
  >;

  useEffect(() => {
    if (String(count) === "0") navigate("/gio-hang");
  }, [count, navigate]);
  // const table = useReactTable();

  const onSubmit = useCallback(
    (values: any) => {
      const { billing_address_1, billing_city } = getData_diagioi_fromId({
        id_district: values.billing_address_1,
        id_city: values.billing_city,
        DiaGioiVN: diaGioiVn,
      });
      const checkoutData = Object.fromEntries(
        Object.entries({ ...values, billing_address_1, billing_city }).map(
          ([key, value]) => {
            if (key.startsWith("billing_"))
              return [key.replace("billing_", "shipping_"), value];
            return [key, value];
          }
        )
      );
      checkoutFn(setLoading)({ ...checkoutData, ...values });
    },
    [diaGioiVn]
  );

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <div className="page-container section_mb">
        <div className="products-container row gx-4">
          <div className="col col-lg-8">
            <h2>Giỏ hàng</h2>
            <OrderReview items={items} total={total} />
            <h2 className="mt-4">Thông tin nhận hàng</h2>
            <CheckoutForm diaGioiVn={diaGioiVn} formik={formik} />
          </div>
          <div className="col col-lg-4">
            <div className="coupon-container">
              <h2 className="block-name mb-4">Mã ưu đãi</h2>
              <Coupon />
            </div>
            <div className="bill-total my-4">
              <h2 className="block-name mb-4">Tạm tính</h2>
              <Prices
                totalAmount={{
                  total,
                  shipping_total,
                  checkout_total,
                  discount_total,
                }}
              />
            </div>
            <div className="bill-total my-4">
              <PaymentMethod
                formik={formik}
                payment_geateways={payment_geateways}
              />
            </div>
            <AddToCartbtn
              className="btn btn-normal fw-semibold w-100 mb-4 checkout-button position-relative"
              loading={loading}
              onClick={formik.submitForm}
            >
              Thanh toán
            </AddToCartbtn>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
