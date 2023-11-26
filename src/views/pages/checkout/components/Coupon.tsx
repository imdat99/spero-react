// import { useState } from "react";
import Select from "react-select";
import styled from "styled-components";

const Coupon = () => {
  // const [loading, setLoading] = useState(false);
  // const [couponCode, setCouponCode] = useState<string>("");
  // const handleSetCode = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.currentTarget.value);
  // };
  const opt = [
    {
      id: 1,
      value: "ahihi",
    },
  ];
  return (
    <CouponContainer>
      <Select
        // defaultValue={[opt[0]]}
        isMulti
        name="colors"
        options={opt}
        className="basic-multi-select"
        classNamePrefix="Nhập mã khuyến mãi"
        classNames={{
          valueContainer: () => "valueContainer",
          input: () => "inputBlock",
          control: () => "selectContro",
          container: (state) =>
            `${state.isFocused ? "isForcus" : ""} ${
              state.hasValue ? "hasValue" : ""
            } selectContainer`,
        }}
      />
      {/* <input
        type="text"
        className="spero__text"
        placeholder="Nhập mã khuyến mãi"
        onChange={handleSetCode}
      /> */}
      {/* {loading && (
        <div className="icon-container">
          <i className="loader"></i>
        </div>
      )} */}
    </CouponContainer>
  );
};

export default Coupon;
const CouponContainer = styled.div`
  position: relative;
  input {
    border: none;
    width: 100%;
    &:focus,
    &:focus-visible {
      outline: none;
    }
  }
  padding: 18px;
  border: 1px solid var(--divider-2);
  border-radius: 20px;
  .selectContro {
    border: none;
    box-shadow: none;
    border-radius: 0;
  }
`;
