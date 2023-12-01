import { Money } from "@app/utils/helper-function";
import { PRODUCT_DATA } from "@app/utils/types";
import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addToCartFn } from "../pages/product-detail/servide";

const ProductCard: React.FC<{ product: PRODUCT_DATA }> = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const isInStock = useMemo(
    () => product.data.stock_status === "instock",
    [product.data.stock_status]
  );
  const handleAddToCart = useCallback(() => {
    addToCartFn(
      1,
      product.data.product_id,
      product.variations[0].variation_id,
      product.data.url,
      setLoading
    );
  }, [product.data.product_id, product.data.url, product.variations]);
  return (
    <>
      <div className="product-img position-relative">
        {!isInStock && (
          <StockTag>
            <p>
              <span>Hết hàng</span>
            </p>
          </StockTag>
        )}
        <Link to={"/san-pham/" + product.slug}>
          <img
            src={product.data.product_image_url.thumb_src}
            alt={product.data.product_name}
            srcSet={product.data.product_image_url.srcset}
            loading="lazy"
          />
        </Link>
      </div>
      <Link
        to={"/san-pham/" + product.slug}
        className="product-title product_name_text product_item spero-text-primary"
      >
        {product.data.product_name}
      </Link>
      <div className="productCard-footer d-flex justify-content-between mt-3">
        <div className="product-price product_name_text flex-1">
          {Money(product.data.price)}
        </div>
        <button
          disabled={loading}
          className="btn page-header-btn product-cart-icon"
          onClick={handleAddToCart}
        >
          {loading ? (
            <div className="spinner-border fs-auto" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <svg
              width="32"
              height="35"
              viewBox="0 0 32 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.46151 31.8501C4.39162 34.1742 7.98162 34.1742 15.1632 34.1742H16.3245C23.5061 34.1742 27.0977 34.1742 29.0279 31.8501M2.46151 31.8501C0.5314 29.5243 1.19407 25.9954 2.5178 18.9344C3.45873 13.9161 3.92839 11.4054 5.71535 9.92242M29.0279 31.8501C30.958 29.5243 30.2953 25.9954 28.9716 18.9344C28.0306 13.9161 27.5594 11.4054 25.7724 9.92242M25.7724 9.92242C23.987 8.43945 21.4313 8.43945 16.3245 8.43945H15.1632C10.0565 8.43945 7.50231 8.43945 5.71535 9.92242"
                stroke="#0F2341"
                strokeWidth="2.32923"
              />
              <path
                d="M10.9189 21.3086H20.5695"
                stroke="#0F2341"
                strokeWidth="2.32923"
                strokeLinecap="round"
              />
              <path
                d="M15.7441 26.1328L15.7441 16.4823"
                stroke="#0F2341"
                strokeWidth="2.32923"
                strokeLinecap="round"
              />
              <path
                d="M10.9189 8.43956V6.83113C10.9189 5.55139 11.4273 4.32406 12.3322 3.41915C13.2371 2.51424 14.4645 2.00586 15.7442 2.00586C17.024 2.00586 18.2513 2.51424 19.1562 3.41915C20.0611 4.32406 20.5695 5.55139 20.5695 6.83113V8.43956"
                stroke="#0F2341"
                strokeWidth="2.32923"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
};

export default ProductCard;
const StockTag = styled.div`
  position: absolute;
  padding: 10px 15px;
  border-radius: 50px;
  color: #fff;
  top: 50%;
  right: 10px;
  background: var(--primary-1);
  transform: translateY(-50%);
  p {
    margin: 0;
  }
`;
