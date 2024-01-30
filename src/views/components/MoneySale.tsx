import { Money } from "@app/utils/helper-function";

const MoneySale: React.FC<{ regularPrice?: string }> = ({ regularPrice }) => {
  return (
    regularPrice && (
      <>
        &nbsp;
        <span
          style={{
            textDecoration: "line-through",
            fontSize: "0.6em",
            opacity: "0.7",
          }}
        >
          {Money(regularPrice)}
        </span>
      </>
    )
  );
};

export default MoneySale;
