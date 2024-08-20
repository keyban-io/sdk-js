import React from "react";
import Row from "./Row";

export type TextFieldProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  "onChange"
> & {
  label?: React.ReactNode;
  onChange: (value: string) => void;
};

export default function TextField({
  label,
  onChange,
  ...props
}: TextFieldProps) {
  const id = React.useId();
  props.id ??= id;

  return (
    <Row style={{ flexGrow: 1 }}>
      {label && <label htmlFor={props.id}>{label}:</label>}
      <input
        type="text"
        {...props}
        style={{ flexGrow: 1, ...props.style }}
        onChange={(e) => onChange(e.target.value)}
      />
    </Row>
  );
}
