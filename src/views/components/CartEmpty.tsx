import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <div className="section_mt section_mb text-center">
      <h2>Chưa có sản phẩm nào trong giỏ hàng.</h2>
      <Link to="/san-pham" type="button">
        Quay lại cửa hàng
      </Link>
    </div>
  );
};

export default CartEmpty;
