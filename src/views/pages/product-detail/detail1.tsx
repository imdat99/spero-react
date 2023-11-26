import { useAppSelector } from "@app/stores/hooks";
import { productStore } from "@app/stores/product";
import { WEIGHT_UNIT } from "@app/utils/constant";
import { Money } from "@app/utils/helper-function";
import { PRODUCT_DATA } from "@app/utils/types";
import useWindowSize from "@app/utils/useWindowSize";
import AddToCartbtn from "@app/views/components/AddToCart";
import { Radio, RadioGroup } from "@app/views/components/RadioGroup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addToCartFn } from "./servide";
import ProductCard from "@app/views/components/ProductCard";

type Position = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
};

const Detail1 = () => {
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  const [animation, setAnimation] = useState<{
    isAnimationInfo: boolean;
    isAnimation: boolean;
    startAnimation: boolean;
  }>({
    isAnimationInfo: false,
    isAnimation: false,
    startAnimation: false,
  });
  const [position, setPosition] = useState<Position>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const { height: containerHeight, top } = position;

  useEffect(() => {
    const calcPosition = () => {
      // console.log(a);
      if (el) {
        setPosition(el.getBoundingClientRect());
      }
    };
    setAnimation({
      isAnimationInfo: containerHeight + top > 1435,
      isAnimation: containerHeight + top > 1000,
      startAnimation: containerHeight + top > 1200,
    });
    window.addEventListener("scroll", calcPosition);
    return () => {
      window.removeEventListener("scroll", calcPosition);
    };
  }, [containerHeight, el, top]);

  const allProducts = useAppSelector(productStore);
  // const { attributes, data, weight_unit, variations } =
  //   useAppSelector(productStore);
  const { slug } = useParams();
  const productData = useMemo(() => {
    const data = Object.entries(allProducts).find(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value.slug === slug
    )!;
    return Object.values(data)[1];
  }, [allProducts, slug]) as PRODUCT_DATA;

  useEffect(() => {
    setAnimation({
      isAnimationInfo: false,
      isAnimation: false,
      startAnimation: false,
    });
    window.scrollTo({
      top: 10,
      left: 0,
      behavior: "smooth",
    });
  }, [slug]);

  const { attributes, data, weight_unit, variations } = productData;
  const { width } = useWindowSize();
  const [loading, setLoading] = useState<boolean>(false);
  const [variation, setVariation] = useState<string>(
    variations[0]?.variation_id || "1"
  );
  const handleAddToCart = useCallback(() => {
    addToCartFn(1, data.product_id, variation, data.url, setLoading);
  }, [data, variation]);

  const sameCat = useMemo(
    () =>
      Object.entries(allProducts).filter(
        ([prod_id, product]) =>
          (String(prod_id) !== String(productData.data.product_id) &&
            product.cat?.id) === productData.cat.id
      ),
    [allProducts, productData.cat.id, productData.data.product_id]
  );

  return (
    <>
      <div style={{ height: containerHeight }} className="section_mb">
        <div ref={(el) => setEl(el)}>
          {/* <LocalToast show={loading} /> */}
          <div className="page-container position-relative section_mt">
            <div className="products-container row g-5">
              <div className="col-12 col-md-6 d-flex flex-wrap overflow-auto">
                <div
                  style={{
                    marginTop: "100vh",
                    marginBottom: "60px",
                  }}
                >
                  <div className="product-content section_mb">
                    <div
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    ></div>
                  </div>
                  <div className="gallery-img">
                    {productData.data.product_gallery_urls.map((img, i) => (
                      <div
                        key={i}
                        className="spero-productThumb w-100 product-img"
                      >
                        <img src={img.src} alt="" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex position-relative">
                <div
                  className={`spero-productThumb w-100 product-img p-3 m-auto text-center ${
                    animation.isAnimation && animation.startAnimation
                      ? "animation"
                      : ""
                  }`}
                  style={{
                    position: animation.isAnimation ? "fixed" : "absolute",
                    maxWidth: "670px",
                    top: animation.isAnimation ? "25%" : "80%",
                    transform:
                      top < 0 ? "translate(0, -55%)" : "translate(-100%, 0%)",
                  }}
                >
                  <img
                    src={data.product_image_url.src}
                    alt={data.product_name || ""}
                    srcSet={data.product_image_url.srcset}
                    className="animation"
                    loading="lazy"
                    style={{
                      // height: "100%",
                      width: "auto",
                      height: top < 0 ? "290px" : "630px",

                      // transform: scrollPercent < 0.05 ? "scale(1)" : "scale(0.75)",
                    }}
                  />
                </div>
                <div
                  className="info-container m-auto"
                  style={{
                    position: animation.isAnimation ? "fixed" : "absolute",
                    maxWidth: "670px",
                    top: animation.isAnimation ? "35%" : "85%",
                  }}
                >
                  <Link to="info" className="product_item spero-text-primary">
                    <h1
                      className="spero-productTitle animation"
                      style={{
                        fontSize: top < 0 ? "30px" : "36px",
                      }}
                    >
                      {data.product_name || ""}
                    </h1>
                  </Link>
                  <span
                    className="product-price productCat-title fw-bold animation"
                    style={{
                      fontSize: top < 0 ? "30px" : "42px",
                    }}
                  >
                    {Money(data.price)}
                  </span>
                  <p className="short_description story_time">
                    {data.short_description}
                  </p>
                  <div className="row justify-content-between mb-5">
                    <div className="product-weight mb-3 my-xl-auto col-12 col-xl-5 order-xl-2">
                      <span className="label story_time">
                        Khối lượng tịch:{" "}
                        <b>
                          {data.weight} {WEIGHT_UNIT[weight_unit]}
                        </b>
                      </span>
                    </div>
                    <div className="col-12 col-xl-7 order-xl-1">
                      {Object.keys(attributes).map((key, _i) => (
                        <RadioGroup
                          key={_i}
                          title={key}
                          onChange={(e) => setVariation(e.target.value)}
                        >
                          {attributes[key].map((item, index) => {
                            const variation_ids = variations.find((item_) =>
                              Object.entries(item_.attributes).find(
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                ([_k, value]) => value === item
                              )
                            );

                            return (
                              <Radio
                                key={index}
                                id={
                                  (variation_ids?.variation_id ||
                                    index) as string
                                }
                                name="variation_id"
                                defaultChecked={index === 0}
                              >
                                <span>{item}</span>
                              </Radio>
                            );
                          })}
                        </RadioGroup>
                      ))}
                    </div>
                  </div>
                  <div className="receive_percent_btn">
                    <button
                      type="button"
                      className="btn btn-outline fw-semibold"
                    >
                      Nhận ưu đãi ngay
                    </button>
                    <AddToCartbtn loading={loading} onClick={handleAddToCart}>
                      Thêm vào giỏ hàng
                    </AddToCartbtn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="info-section"
        style={{
          width: width - 20,
          zIndex: 1,
          background: "#fff",
          bottom: 0,
          position: animation.isAnimationInfo ? "fixed" : "unset",
          marginBottom: animation.isAnimationInfo ? 0 : "60px",
        }}
      >
        <div className="products-container d-flex flex-wrap justify-content-between">
          {data.info
            .filter((i) => i.key !== "Hương vị")
            .map(({ key, value }, index) => (
              <span className="w-xs-50" key={index}>
                {key}: <b>{value}</b>
              </span>
            ))}
        </div>
      </div>
      <div>
        <div className="products products-container section_mb section_mt">
          <div className="speroProducts">
            <div className="productCat text-center">
              <p className="productCat-title">
                Cùng trong{" "}
                <span className="text-uppercase">{productData.cat.name}</span>
              </p>
            </div>
            <div className="listProducts row justify-center">
              {sameCat.map(([id, product]) => (
                <div className={"col-12 col-md-4 my-3"} key={id}>
                  <ProductCard product={product as PRODUCT_DATA} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail1;
