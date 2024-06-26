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
import { useTranslation } from "react-i18next";

// import { useReactTable } from '@tanstack/react-table'

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
    const {t} = useTranslation();

    const schema = yup.object({
        billing_first_name: yup.string().required(t("Required")),
        billing_phone: yup
            .string()
            .required(t("Required"))
            .matches(
                /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                t("InvalidData")
            ),
        billing_city: yup.string().required(t("Required")),
        billing_address_2: yup.string().required(t("Required")),
        billing_email: yup
            .string()
            .required(t("Required"))
            .matches(
                /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                t("InvalidData")
            ),
        billing_address_1: yup.string().required(t("Required")),
        payment_method: yup
            .string()
            .required(t("choosePayment")),
    });

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
        validateOnBlur: true,
        validateOnChange: false,
    });

    return (
        <>
            <div className="page-container section_mb">
                <div className="products-container row gx-4">
                    <div className="col-12 col-lg-8">
                        <h2>{t("Product.ProductCart")}</h2>
                        <OrderReview items={items} total={total} />
                        <h2 className="mt-4">{t("DeliveryInformation")}</h2>
                        <CheckoutForm diaGioiVn={diaGioiVn} formik={formik} />
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="coupon-container">
                            <h2 className="block-name mb-4">{t("Voucher")}</h2>
                            <Coupon />
                        </div>
                        <div className="bill-total my-4">
                            <h2 className="block-name mb-4">{t("ProvisionalInvoice")}</h2>
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
                        {t("CheckOut")}
                        </AddToCartbtn>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
