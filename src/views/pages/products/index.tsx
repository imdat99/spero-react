import { PRODUCT_CAT, PRODUCT_DATA, PRODUCT_TAG } from "@app/utils/types";
import PageSlogan from "@app/views/components/PageSlogan";
import ProductCard from "@app/views/components/ProductCard";
import { Fragment, useEffect, useMemo, useRef } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import Map2 from "../coffeeMap/Map2";

const Products = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { hash } = useLocation();
  const { cat_data, tag_data } = useLoaderData() as {
    cat_data: PRODUCT_CAT[];
    tag_data: PRODUCT_TAG[];
  };
  const products = useMemo(
    () =>
      cat_data.reduce(
        (prv: PRODUCT_DATA[], item) => [...prv, ...item.products],
        []
      ),
    [cat_data]
  );
  const map_tags = useMemo(() => {
    tag_data.forEach((item) => {
      item.products =
        item.product_ids.map(
          (product_id) =>
            products.find((product) => product.data.product_id === product_id)!
        ) || [];
    });
    return tag_data;
  }, [products, tag_data]);

  useEffect(() => {
    if (containerRef.current && hash) {
      const element = containerRef.current.querySelector(hash);
      if (element)
        element.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, [hash]);

  return (
    <div className="section_mt" ref={containerRef}>
      <PageSlogan />
      <Map2 map_tags={map_tags} />
      {cat_data.map((item) => (
        <Fragment key={item.id}>
          <div
            id={item.slug}
            className="products products-container section_mb mt-5"
          >
            <div className="speroProducts">
              <div className="productCat">
                <title className="productCat-title d-block">{item.name}</title>
                <p className="productCat-des spero__text text-black">
                  {item.description}
                </p>
              </div>
              <div className="listProducts row">
                {item.products.map((product) => (
                  <div
                    className="col-12 col-md-4 my-3"
                    key={product.data.product_id}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default Products;
