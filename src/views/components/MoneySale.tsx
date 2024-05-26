import { Money } from "@app/utils/helper-function";

const MoneySale: React.FC<{
  display_price: string;
  display_regular_price: string;
}> = (price) => {
  return (
    price.display_regular_price &&
    price.display_price != price.display_regular_price && (
      <>
        &nbsp;
        <span
          style={{
            textDecoration: "line-through",
            fontSize: "0.6em",
            opacity: "0.7",
          }}
        >
          {Money(price.display_regular_price)}
        </span>
      </>
    )
  );
};

export default MoneySale;
