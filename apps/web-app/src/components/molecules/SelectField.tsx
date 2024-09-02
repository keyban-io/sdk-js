import React from "react";
import Row from "../atoms/Row";

export type SelectFieldProps = Omit<
  React.HTMLProps<HTMLSelectElement>,
  "onChange"
> & {
  label?: React.ReactNode;
  onChange: (value: string) => void;
};

export default function SelectField({
  label,
  onChange,
  ...props
}: SelectFieldProps) {
  const id = React.useId();
  props.id ??= id;

  return (
    <Row style={{ flexGrow: 1 }}>
      {label && <label htmlFor={props.id}>{label}:</label>}
      <select
        type="text"
        {...props}
        style={{ flexGrow: 1, padding: 1, ...props.style }}
        onChange={(e) => onChange(e.target.value)}
      />
    </Row>
  );
}
