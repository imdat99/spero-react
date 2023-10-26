import { Money } from "@app/utils/helper-function";
import { PRODUCT_CAT } from "@app/utils/types";
import Map1 from "@app/views/components/Map1";
import PageSlogan from "@app/views/components/PageSlogan";
import { Fragment } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Products = () => {
  const data = useLoaderData() as PRODUCT_CAT[];
  return (
    <>
      <div className="section_mt"></div>
      <PageSlogan />
      <Map1 />
      {data.map((item) => (
        <Fragment key={item.id}>
          <div className="products products-container section_mb mt-5">
            <div className="speroProducts">
              <div className="productCat">
                <title className="productCat-title text-uppercase d-block">
                  {item.name}
                </title>
                <p className="productCat-des spero__text text-black">
                  {item.description}
                </p>
              </div>
              <div className="listProducts row">
                {item.products.map((product) => (
                  <Fragment key={product.data.product_id}>
                    <div className="col-12 col-md-4 my-3">
                      <div className="product-img">
                        <Link to={product.slug}>
                          <img
                            src={product.data.product_image_url.thumb_src}
                            alt={product.data.product_name}
                            srcSet={product.data.product_image_url.srcset}
                            loading="lazy"
                          />
                        </Link>
                      </div>
                      <Link
                        to={product.slug}
                        className="product-title product_name_text product_item spero-text-primary"
                      >
                        {product.data.product_name}
                      </Link>
                      <div className="productCard-footer d-flex justify-content-between mt-3">
                        <div className="product-price product_name_text">
                          {Money(product.data.price)}
                        </div>
                        <div className="product-cart-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="37"
                            height="36"
                            viewBox="0 0 37 36"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_970_161)">
                              <path
                                d="M6.46151 32.8501C8.39162 35.1742 11.9816 35.1742 19.1632 35.1742H20.3245C27.5061 35.1742 31.0977 35.1742 33.0279 32.8501M6.46151 32.8501C4.5314 30.5243 5.19407 26.9954 6.5178 19.9344C7.45873 14.9161 7.92839 12.4054 9.71535 10.9224M33.0279 32.8501C34.958 30.5243 34.2953 26.9954 32.9716 19.9344C32.0306 14.9161 31.5594 12.4054 29.7724 10.9224M29.7724 10.9224C27.987 9.43945 25.4313 9.43945 20.3245 9.43945H19.1632C14.0565 9.43945 11.5023 9.43945 9.71535 10.9224"
                                stroke="#0F2341"
                                strokeWidth="2.32923"
                              />
                              <path
                                d="M14.9189 22.3086H24.5695"
                                stroke="#0F2341"
                                strokeWidth="2.32923"
                                strokeLinecap="round"
                              />
                              <path
                                d="M19.7441 27.1328L19.7441 17.4823"
                                stroke="#0F2341"
                                strokeWidth="2.32923"
                                strokeLinecap="round"
                              />
                              <path
                                d="M14.9189 9.43956V7.83113C14.9189 6.55139 15.4273 5.32406 16.3322 4.41915C17.2371 3.51424 18.4645 3.00586 19.7442 3.00586C21.024 3.00586 22.2513 3.51424 23.1562 4.41915C24.0611 5.32406 24.5695 6.55139 24.5695 7.83113V9.43956"
                                stroke="#0F2341"
                                strokeWidth="2.32923"
                                strokeLinecap="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_970_161">
                                <rect
                                  width="36"
                                  height="36"
                                  fill="white"
                                  transform="translate(0.767578 0.00585938)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default Products;
