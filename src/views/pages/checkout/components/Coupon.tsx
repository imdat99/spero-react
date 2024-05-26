// import { useState } from "react";
import { searchCoupon } from "@app/utils/constant";
import { appRequest } from "@app/utils/request";
import { debounce } from "lodash";
import AsyncSelect from "react-select/async";
import styled from "styled-components";

const Coupon = () => {
    // const [loading, setLoading] = useState(false);
    // const [couponCode, setCouponCode] = useState<string>("");
    // const handleSetCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   console.log(e.currentTarget.value);
    // };
    const _loadOptions = (
        inputValue: string,
        callback: (options: any) => void
    ) => {
        appRequest({
            url: searchCoupon,
            method: "POST",
            body: JSON.stringify({ code: inputValue }),
        }).then((r) => {
            callback(() => r);
        });
    };
    const loadOptions = debounce(_loadOptions, 500);

    return (
        <CouponContainer>
            <AsyncSelect
                loadOptions={loadOptions}
                // defaultValue={[opt[0]]}
                name="colors"
                // options={opt}
                defaultOptions
                // cacheOptions
                className="basic-multi-select"
                // classNamePrefix="Nhập mã khuyến mãi"
                placeholder="Nhập mã khuyến mãi"
                classNames={{
                    valueContainer: () => "valueContainer",
                    input: () => "inputBlock",
                    control: () => "selectContro",
                    container: (state) =>
                        `${state.isFocused ? "isForcus" : ""} ${
                            state.hasValue ? "hasValue" : ""
                        } selectContainer`,
                }}
                getOptionLabel={(opt: any) => opt["value"]}
                getOptionValue={(opt: any) => opt["id"]}
                isClearable
                onChange={(e) => {
                    console.log(e);
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
