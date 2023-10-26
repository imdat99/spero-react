import styled from "styled-components";

const Coupon = () => {
  return (
    <CouponContainer>
      <input
        type="text"
        className="spero__text"
        placeholder="Nhập mã khuyến mãi"
      />
    </CouponContainer>
  );
};

export default Coupon;
const CouponContainer = styled.div`
  input {
    border: none;
    width: 100%;
    &:focus,
    &:focus-visible {
      outline: none;
    }
  }
  padding: 24px;
  border: 1px solid var(--divider-2);
  border-radius: 20px;
`;
