import { PROVINCE } from "@app/utils/types";
import FakeMuiSelect from "@app/views/components/FakeMuiSelect";
import Input from "@app/views/components/Input";

const CheckoutForm: React.FC<{
  diaGioiVn: PROVINCE[];
  formik: any;
}> = ({ diaGioiVn, formik }) => {
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Input
          autoComplete="off"
          label="Họ và tên"
          name="billing_first_name"
          value={formik.values.billing_first_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          formInstant={formik}
        />
        <div className="checkoutColumn">
          <Input
            autoComplete="off"
            label="Số điện thoại"
            name="billing_phone"
            value={formik.values.billing_phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            formInstant={formik}
          />
          <Input
            autoComplete="off"
            label="Email"
            name="billing_email"
            value={formik.values.billing_email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            formInstant={formik}
          />
          <FakeMuiSelect
            label="Thành phố"
            formInstant={formik}
            value={
              diaGioiVn
                ? diaGioiVn.find(
                    (option) => option.Name === formik.values.billing_city
                  )
                : ""
            }
            onChange={(option: any) => {
              formik.setFieldValue("billing_address_1", "");
              formik.setFieldValue("billing_city", option?.Name || "");
            }}
            name="billing_city"
            options={diaGioiVn}
            getOptionLabel={(opt: any) => opt["Name"]}
            getOptionValue={(opt: any) => opt["Name"]}
            isClearable
          />
          <FakeMuiSelect
            formInstant={formik}
            label="Quận huyện"
            isDisabled={!formik.values.billing_city}
            value={
              formik.values.billing_city
                ? diaGioiVn
                    .find(
                      (province) => province.Name === formik.values.billing_city
                    )
                    ?.Districts.find(
                      (option) => option.Name === formik.values.billing_address_1
                    ) || ""
                : ""
            }
            onChange={(option: any) =>
              formik.setFieldValue("billing_address_1", option?.Name || "")
            }
            name="billing_address_1"
            options={
              diaGioiVn.find(
                (province) => province.Name === formik.values.billing_city
              )?.Districts
            }
            getOptionLabel={(opt: any) => opt["Name"]}
            getOptionValue={(opt: any) => opt["Name"]}
            required
            isClearable
          />
        </div>
        <Input
          autoComplete="off"
          label="Địa chỉ"
          name="billing_address_2"
          value={formik.values.billing_address_2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          formInstant={formik}
        />
        <div className="note-field">
          <Input
            autoComplete="off"
            type="text"
            label="Ghi chú"
            name="order_comments"
            value={formik.values.order_comments}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            formInstant={formik}
          />
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
