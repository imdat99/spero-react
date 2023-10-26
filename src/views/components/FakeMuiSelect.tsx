import Select, { Props } from "react-select";
const FakeMuiSelect = ({
  label,
  formInstant,
  errorComponent,
  ...props
}: Props & {
  label: React.ReactNode;
  formInstant?: any;
  errorComponent?: React.ReactNode;
}) => {
  return (
    <div className="formControl">
      <Select
        placeholder={""}
        classNames={{
          valueContainer: () => "valueContainer",
          input: () => "inputBlock",
          control: () => "selectContro",
          container: (state) =>
            `${state.isFocused ? "isForcus" : ""} ${
              state.hasValue ? "hasValue" : ""
            } selectContainer`,
        }}
        {...props}
      />
      <span className="highlight"></span>
      {formInstant?.errors[props.name || ""] && (
        <p className="errText">
          {errorComponent
            ? errorComponent
            : formInstant?.errors[props.name || ""]}
        </p>
      )}
      <span className="bar"></span>
      <label>{label}</label>
    </div>
  );
};

export default FakeMuiSelect;
