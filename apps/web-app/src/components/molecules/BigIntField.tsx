import React from "react";
import Row from "../atoms/Row";

export type NumberFieldProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  "onChange"
> & {
  label?: React.ReactNode;
  onChange: (value: bigint) => void;
};

export default function BigIntField({
  label,
  onChange,
  ...props
}: NumberFieldProps) {
  const id = React.useId();
  props.id ??= id;

  return (
    <Row style={{ flexGrow: 1 }}>
      {label && <label htmlFor={props.id}>{label}:</label>}
      <input
        type="number"
        {...props}
        style={{ flexGrow: 1, ...props.style }}
        onChange={(e) => onChange(BigInt(e.target.value))}
      />
    </Row>
  );
}
