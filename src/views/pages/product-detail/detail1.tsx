import { useAppSelector } from "@app/stores/hooks";
import { productStore } from "@app/stores/product";
import { WEIGHT_UNIT } from "@app/utils/constant";
import {
    Money,
    decodeHTML,
    elementIsVisibleInViewport,
} from "@app/utils/helper-function";
import { PRODUCT_DATA } from "@app/utils/types";
import useWindowSize from "@app/utils/useWindowSize";
import AddToCartbtn from "@app/views/components/AddToCart";
import { Radio, RadioGroup } from "@app/views/components/RadioGroup";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addToCartFn } from "./servide";
import ProductCard from "@app/views/components/ProductCard";
import styled from "styled-components";
import Slider from "react-slick";
import MoneySale from "@app/views/components/MoneySale";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";

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
const keynames: Record<string, string> = {
    "Độ cao": "Height",
    "Mức rang": "roast",
    "Phương pháp sơ chế": "process_method",
    "Mùa vụ": "season",
    "Hương vị": "flavor_profile",
} 
const Detail1 = () => {
    const { t } = useTranslation();
    const scrollPos = useRef<number>(0);
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
    const topAnimation = useMemo(
        () => ((containerHeight + top) * 100) / containerHeight,
        [containerHeight, top]
    );
    const { width } = useWindowSize();

    const [isInview, setIsInview] = useState(false);
    const lastelement = document.querySelector("#last-item");
    const lastImg = document.querySelector("#last-img");

    const allProducts = useAppSelector(productStore);
    // const { attributes, data, weight_unit, variations } =
    //   useAppSelector(productStore);
    const { slug } = useParams();
    const productData = Object.values(
    Object.entries(allProducts).find(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, value]) => value.slug === slug
    )!
    )[1] as PRODUCT_DATA;

    const { attributes, data, weight_unit, variations } = productData;

    const zoomConstant = Math.round((width * 10) / 1920) / 10;
    const [loading, setLoading] = useState<boolean>(false);
    const [variation, setVariation] = useState<string>("");

    const handleAddToCart = useCallback(() => {
        addToCartFn(1, data.product_id, variation, data.url, setLoading);
    }, [data, variation]);

    const sameCat = useMemo(
        () =>
            Object.entries(allProducts).filter(
                ([prod_id, product]) =>
                    (String(prod_id) !== String(productData?.data.product_id) &&
            product.cat?.id) === productData.cat.id
            ),
        [allProducts, productData.cat.id, productData?.data.product_id]
    );
    const handleNavigate = () => {
        window.open((window as any).zaloLink);
    };
    const variationsPrice = variations.find(
        (item) => item.variation_id == variation
    ) || {
        display_price: data.price,
        display_regular_price: data.regular_price,
    };

    useEffect(() => {
        const calcPosition = () => {
            const documentTop = document.body.getBoundingClientRect().top;
            // console.log(a);
            const isView = elementIsVisibleInViewport(lastelement as any);
            setIsInview((prev): any => {
                if (documentTop < scrollPos.current) {
                    console.log("documentTop", documentTop);
                    console.log("scrollPos.current", scrollPos.current);
                    // Down
                    if (!prev && isView) return isView;
                    return prev;
                } else {
                    if (!prev || elementIsVisibleInViewport(lastImg as any)) return false;
                    if (prev) return true;
                }
            });
            if (el) {
                setPosition(el.getBoundingClientRect());
            }

            scrollPos.current = documentTop;
        };
        setAnimation({
            isAnimationInfo: topAnimation > 48.5,
            isAnimation: topAnimation > 40.5,
            startAnimation: topAnimation > 60.475,
        });
        window.addEventListener("scroll", calcPosition);
        return () => {
            window.removeEventListener("scroll", calcPosition);
        };
    }, [containerHeight, top, topAnimation, el, lastelement]);

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
        setVariation(variations[0]?.variation_id);
        return () => {
            setIsInview(false);
            setVariation("");
        };
    }, [slug, variations]);

    return (
        <>
            {width > 575 ? (
                <>
                    <div style={{ height: containerHeight }} className="section_mb">
                        <div ref={(el) => setEl(el)}>
                            {/* <LocalToast show={loading} /> */}
                            <div className="page-container position-relative section_mt">
                                <div className="products-container row g-5">
                                    <div className="col-12 col-md-6 d-flex flex-wrap overflow-auto">
                                        <div
                                            className="w-100"
                                            style={{
                                                marginTop: "100vh",
                                                marginBottom: "60px",
                                            }}
                                        >
                                            <div
                                                className="product-content section_mb pc-content"
                                                dangerouslySetInnerHTML={{ __html: data.description }}
                                            />

                                            <div className="gallery-img">
                                                {productData?.data.product_gallery_urls.map((img, i) => (
                                                    <div
                                                        key={i}
                                                        className="spero-productThumb w-100 product-img"
                                                    >
                                                        {i ===
                            productData?.data.product_gallery_urls.length - 1 ? (
                                                                <img src={img.full_src} alt="" id="last-img" />
                                                            ) : (
                                                                <img src={img.full_src} alt="" />
                                                            )}
                                                    </div>
                                                ))}
                                                {!productData?.data.product_gallery_urls.length && (
                                                    <div id="last-img" style={{height: "1px", width: "1px"}}></div>
                                                )}
                                                <div id="last-item"></div>
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
                                                // opacity: animation.isAnimationInfo ? "1" : "0",
                                                position: !isInview ? "fixed" : "absolute",
                                                aspectRatio: 1,
                                                maxWidth: "670px",
                                                top: !isInview ? "27%" : "79%",
                                                zoom: width < 1380 ? zoomConstant : 1,
                                                height:
                          topAnimation < 95
                              ? "290px"
                              : topAnimation < 100
                                  ? "450px"
                                  : "670px",
                                                transform:
                          topAnimation < 95
                              ? "translate(0%,-40%)"
                              : // : topAnimation < 100
                              // ? "translate(-65%, -15%)"
                              "translate(-105%, -15%)",
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
                                                    height:
                            topAnimation < 95
                                ? "290px"
                                : topAnimation < 100
                                    ? "450px"
                                    : "670px",
                                                    // transform: scrollPercent < 0.05 ? "scale(1)" : "scale(zoomConstant5)",
                                                }}
                                            />
                                        </div>
                                        <div
                                            className="info-container m-auto"
                                            style={{
                                                position: !isInview ? "fixed" : "absolute",
                                                maxWidth: "670px",
                                                zoom: width < 1380 ? zoomConstant : 1,
                                                top: !isInview
                                                    ? topAnimation < 95
                                                        ? "47%"
                                                        : "30%"
                                                    : "85%",
                                            }}
                                        >
                                            <Link to="" className="product_item spero-text-primary">
                                                <h1
                                                    className="spero-productTitle animation"
                                                    style={{
                                                        fontSize: top < 0 ? "30px" : "36px",
                                                        lineHeight: top < 0 ? "32px" : "48px",
                                                    }}
                                                >
                                                    {data.product_name || ""}
                                                </h1>
                                            </Link>
                                            <p
                                                className="product-price productCat-title fw-bold animation"
                                                style={{
                                                    fontSize: top < 0 ? "30px" : "42px",
                                                    marginBottom: top < 0 ? "unset" : "1.5rem",
                                                }}
                                            >
                                                {Money(variationsPrice.display_price)}
                                                <MoneySale {...variationsPrice} />
                                            </p>
                                            <p
                                                className="short_description story_time"
                                                style={{
                                                    lineHeight: top < 0 ? "24px" : "32px",
                                                }}
                                            >
                                                {data.short_description}
                                            </p>
                                            <div className="row justify-content-between mb-5">
                                                <div
                                                    className="product-weight mb-3 my-xl-auto col-12 col-xl-5 order-xl-2"
                                                    style={isEmpty(attributes) ? { width: "100%" } : {}}
                                                >
                                                    <span className="label story_time">
                            {t("NetWeight")}:{" "}
                                                        <b>
                                                            {data.weight} {WEIGHT_UNIT[weight_unit]}
                                                        </b>
                                                    </span>
                                                </div>
                                                {!isEmpty(attributes) && (
                                                    <div className="col-12 col-xl-7 order-xl-1">
                                                        {Object.keys(attributes).map((key, _i) => (
                                                            <RadioGroup
                                                                key={_i}
                                                                title={key}
                                                                onChange={(e) => setVariation(e.target.value)}
                                                            >
                                                                {attributes[key].map((item, index) => {
                                                                    const variation_ids = variations.find(
                                                                        (item_) =>
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
                                                )}
                                            </div>
                                            <div className="row gx-3">
                                                <div className="col-12 col-md-6">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline fw-semibold w-100"
                                                        onClick={handleNavigate}
                                                    >
                            {t("GetOfferNow")}
                                                    </button>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <AddToCartbtn
                                                        className="btn btn-normal fw-semibold position-relative w-100"
                                                        loading={loading}
                                                        onClick={handleAddToCart}
                                                    >
                            {t("addToCart")}
                                                    </AddToCartbtn>
                                                </div>
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
                            // width: width - 20,
                            width: "100%",
                            zoom: width < 1380 ? zoomConstant : 1,
                            zIndex: 1,
                            background: "#fff",
                            bottom: 0,
                            position: animation.isAnimationInfo ? "fixed" : "unset",
                            marginBottom: animation.isAnimationInfo ? 0 : "60px",
                        }}
                    >
                        <div className="products-container d-flex flex-wrap justify-content-between">
                            {data.info
                                .filter((i) =>
                                    top < -110
                                        ? i.key !== "Mùa vụ" && i.key !== "Hương vị"
                                        : i.key !== "Hương vị"
                                )
                                .map(({ key, value }, index) => (
                                    <span className="w-xs-50" key={index}>
                                        {t(keynames[key])}: <b>{decodeHTML(value)}</b>
                                    </span>
                                ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="products-container">
                        <div className="col-12 col-md-6">
                            <div className="spero-productThumb w-100 product-img pb-4 m-auto text-center col-12 mb-3">
                                <SlickStyled
                                    dots
                                    infinite
                                    autoplay={true}
                                    autoplaySpeed={3000}
                                    speed={700}
                                    slidesToShow={1}
                                    slidesToScroll={1}
                                    customPaging={() => {
                                        return (
                                            <svg
                                                width="19"
                                                height="6"
                                                viewBox="0 0 19 6"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect width="19" height="6" rx="3" fill="#EFEFEF" />
                                            </svg>
                                        );
                                    }}
                                >
                                    <img
                                        src={data.product_image_url.src}
                                        alt={data.product_name || ""}
                                        srcSet={data.product_image_url.srcset}
                                        loading="lazy"
                                        style={{
                                            height: "auto",
                                            width: "100%",
                                        }}
                                    />
                                    {productData?.data.product_gallery_urls.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img.src}
                                            alt={data.product_name || ""}
                                            srcSet={img.srcset}
                                            loading="lazy"
                                            style={{
                                                height: "auto",
                                                width: "100%",
                                            }}
                                        />
                                    ))}
                                </SlickStyled>
                            </div>
                            <MobileSlider className="mobile-products-info">
                                <Slider
                                    autoplay={true}
                                    autoplaySpeed={3000}
                                    slidesToShow={3}
                                    variableWidth={true}
                                    centerMode={true}
                                    infinite={true}
                                    initialSlide={3}
                                    slidesToScroll={1}
                                    centerPadding="0"
                                >
                                    {data.info
                                        .filter((i) => i.key !== "Hương vị")
                                        .map(({ key, value }, index) => (
                                            <div className="product-info-item" key={index}>
                                                {t(keynames[key])}: {decodeHTML(value)}
                                            </div>
                                        ))}
                                </Slider>
                            </MobileSlider>
                            <div className="info-container m-auto col-12">
                                <Link to="" className="product_item spero-text-primary">
                                    <h1 className="mobile-spero-productTitle">
                                        {data.product_name || ""}
                                    </h1>
                                </Link>
                                <p className="product-price productCat-title fw-bold mobile-spero-productTitle">
                                    {Money(variationsPrice.display_price)}
                                    <MoneySale {...variationsPrice} />
                                </p>
                                <p
                                    className="short_description story_time mobile-short_description"
                                    style={{
                                        lineHeight: "20px",
                                        fontSize: "14px",
                                    }}
                                >
                                    {data.short_description}
                                </p>
                                <div
                                    className="row justify-content-between"
                                    style={{ marginBottom: "36px" }}
                                >
                                    <div className="product-weight mb-3 my-xl-auto col-12 col-xl-5 order-xl-2">
                                        <span className="mobile-weight">
                      {t("NetWeight")}: {data.weight} {WEIGHT_UNIT[weight_unit]}
                                        </span>
                                    </div>
                                    <ProductOption>
                                        {Object.keys(attributes).map((key, _i) => (
                                            <RadioGroup
                                                className="flex-wrap"
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
                                (variation_ids?.variation_id || index) as string
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
                                    </ProductOption>
                                </div>
                                <MobileBtn className="row g-3">
                                    <div className="col-12 col-md-6">
                                        <button
                                            type="button"
                                            className="btn btn-outline fw-semibold w-100"
                                            onClick={handleNavigate}
                                        >
                      {t("GetOfferNow")}
                                        </button>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <AddToCartbtn
                                            className="btn btn-normal fw-semibold position-relative w-100"
                                            loading={loading}
                                            onClick={handleAddToCart}
                                        >
                      {t("addToCart")}
                                        </AddToCartbtn>
                                    </div>
                                </MobileBtn>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 d-flex flex-wrap overflow-auto">
                            <div className="product-content mt-5">
                                <div
                                    className="mobileDescription"
                                    dangerouslySetInnerHTML={{ __html: data.description }}
                                ></div>
                            </div>
                            <div className="gallery-img d-none d-md-flex">
                                {productData?.data.product_gallery_urls.map((img, i) => (
                                    <div key={i} className="spero-productThumb w-100 product-img">
                                        <img src={img.src} alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div>
                <div className="products products-container section_mb section_mt">
                {sameCat.length ? <div className="speroProducts">
                        <div className="productCat text-center">
                            <p className="productCat-title">
                {t("SameCollection")}{" "}
                                <span className="text-uppercase">{productData.cat.name}</span>
                            </p>
                        </div>
                        <div className="listProducts row justify-content-md-center g-6">
                            {sameCat.map(([id, product]) => (
                                <div className={"col-6 col-md-4 my-3"} key={id}>
                                    <ProductCard product={product as PRODUCT_DATA} />
                                </div>
                            ))}
                        </div>
                    </div> : null }
                </div>
            </div>
        </>
    );
};

export default Detail1;

const ProductOption = styled.div`
  h3 {
    font-size: 14px !important;
    display: block;
    width: fit-content;
  }
  label {
    padding: 10px 20px;
    font-size: 12px;
  }
`;
const SlickStyled = styled(Slider)`
  width: 100%;
  .slick-list {
    overflow-x: hidden;
  }
  .slick-dots {
    margin-top: 1rem;
    .slick-active rect {
      fill: var(--primary-1);
    }
  }
  .slick-arrow {
    display: none !important;
  }
`;

const MobileSlider = styled.div`
  width: 100%;
  .slick-center {
    .product-info-item {
      color: var(--primary-1) !important;
    }
  }
  .product-info-item {
    margin-inline: 10px;
    font-weight: 600;
    color: var(--neutral-text-4);
    font-size: 14px;
  }
  .slick-list {
    overflow-x: hidden;
    padding: 0 !important;
    height: 58px;
  }
  .slick-slide {
    padding-top: 9px;
    padding-bottom: 9px;
    border-top: 0.224px solid var(--Divider-2, #efefef);
    border-bottom: 0.224px solid var(--Divider-2, #efefef);
  }
  .slick-arrow {
    display: none !important;
  }
`;
const MobileBtn = styled.div`
  button {
    font-size: 20px !important;
  }
`;
