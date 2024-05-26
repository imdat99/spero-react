import React from "react";

const Input: React.FC<
  {
    label: React.ReactNode;
    errorComponent?: React.ReactNode;
    formInstant?: any;
  } & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = ({ label, errorComponent, formInstant, ...props }) => {
    return (
        <div className="formControl">
            <input placeholder=" " {...props} />
            <span className="highlight"></span>
            {formInstant?.errors[props.name || ""] && (
                <p className="errText">
                    {errorComponent
                        ? errorComponent
                        : formInstant?.errors[props.name || ""]}
                </p>
            )}
            <span className="bar"></span>
            {label && <label>{label}</label>}
        </div>
    );
};

export default Input;
