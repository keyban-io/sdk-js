import React from "react";
import Row from "../atoms/Row";

export type TextFieldProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  "onChange"
> & {
  label?: React.ReactNode;
  onChange?: (value: string) => void;
};

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, onChange, ...props }, ref) => {
    const id = React.useId();
    props.id ??= id;

    return (
      <Row style={{ flexGrow: 1 }}>
        {label && <label htmlFor={props.id}>{label}:</label>}
        <input
          ref={ref}
          type="text"
          {...props}
          style={{ flexGrow: 1, ...props.style }}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </Row>
    );
  },
);

export default TextField;
