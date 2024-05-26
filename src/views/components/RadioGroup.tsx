import { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";

export const RadioGroup = ({
    children,
    title,
    onChange,
    className,
}: PropsWithChildren<{
  children: ReactNode | ReactNode[];
  title: string;
  className?: string;
  onChange: (p?: any) => void;
}>) => {
    return (
        <GroupContainer
            className={className}
            role="radiogroup"
            aria-labelledby="group_heading"
            onChange={onChange}
        >
            <h3>{title}:</h3>
            {children}
        </GroupContainer>
    );
};

export const Radio = ({
    children,
    id,
    name,
    defaultChecked,
}: PropsWithChildren<{
  id: string;
  name: string;
  defaultChecked?: boolean;
}>) => {
    return (
        <>
            <input
                type="radio"
                id={id}
                name={name}
                defaultChecked={defaultChecked}
                value={id}
            />
            <label htmlFor={id}>{children}</label>
        </>
    );
};

const GroupContainer = styled.div`
  display: flex;
  & {
    h3 {
      font-size: 20px;
      margin-block: auto;
    }
    input {
      &[type="radio"] {
        appearance: none;
        opacity: 0;
        position: absolute;
      }
      &[type="radio"]:checked + label {
        background: var(--primary-1);
        color: #fff;
        /* outline: solid 3px var(--primary-1); */
      }
    }
    label {
      position: relative;
      padding-inline: 24px;
      padding-block: 10px;
      border-radius: 99px;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: 26px;
      border: 1px solid var(--primary-1);
      margin-left: 20px;
      text-align: center;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
