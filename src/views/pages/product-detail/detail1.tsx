import { useAppSelector } from "@app/stores/hooks";
import { productStore } from "@app/stores/product";
import { WEIGHT_UNIT } from "@app/utils/constant";
import { Money } from "@app/utils/helper-function";
import AddToCartbtn from "@app/views/components/AddToCart";
import { Radio, RadioGroup } from "@app/views/components/RadioGroup";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { addToCartFn } from "./servide";

const Detail1 = () => {
  const { attributes, data, weight_unit, variations } =
    useAppSelector(productStore);

  const [loading, setLoading] = useState<boolean>(false);
  const [variation, setVariation] = useState<string>(
    variations[0]?.variation_id || "1"
  );
  const handleAddToCart = useCallback(() => {
    addToCartFn(1, data.product_id, variation, data.url, setLoading);
  }, [data, variation]);
  return (
    <>
      {/* <LocalToast show={loading} /> */}
      <div className="page-container section_mt section_mb">
        <div className="products-container row">
          <div className="col-12 col-md-6">
            <div className="spero-productThumb product-img p-3">
              <img
                src={data.product_image_url.src}
                alt={data.product_name || ""}
                srcSet={data.product_image_url.srcset}
                loading="lazy"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <Link to="info" className="product_item spero-text-primary">
              <h1 className="spero-productTitle">{data.product_name || ""}</h1>
            </Link>
            <span className="product-price productCat-title fw-bold">
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
                          id={(variation_ids?.variation_id || index) as string}
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
              <button type="button" className="btn btn-outline fw-semibold">
                Nhận ưu đãi ngay
              </button>
              <AddToCartbtn loading={loading} onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </AddToCartbtn>
            </div>
          </div>
        </div>
      </div>
      <div className="info-section section_mb">
        <div className="products-container d-flex flex-wrap justify-content-between">
          {data.info.map(({ key, value }, index) => (
            <span className="w-xs-50" key={index}>
              {key}: <b>{value}</b>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Detail1;
