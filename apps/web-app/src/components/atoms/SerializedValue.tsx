import React from "react";
import type { TextareaAutosizeProps } from "react-textarea-autosize";
import TextareaAutosize from "react-textarea-autosize";

import Row from "~/components/atoms/Row";

import styles from "./SerializedValue.module.css";

export type SerializedValueProps = Omit<
  TextareaAutosizeProps,
  "value" | "onChange"
> & {
  label?: React.ReactNode;
  value: string | bigint | Parameters<JSON["stringify"]>[0];
};

export default function SerializedValue({
  label,
  value,
  style,
  ...props
}: SerializedValueProps) {
  const id = React.useId();
  props.id ??= id;

  let textValue: string;
  if (typeof value === "string") textValue = value;
  else if (typeof value === "bigint") textValue = value.toString();
  else if (value == null) textValue = "";
  else
    try {
      textValue = JSON.stringify(
        value,
        (_, value) => (typeof value === "bigint" ? value.toString() : value),
        2,
      );
    } catch (e) {
      console.error(e);
      console.log(value);
      textValue = "NOT_SERIALIZABLE";
    }

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(textValue);
  }, [textValue]);

  return (
    <Row style={{ flexGrow: 1, ...style }}>
      {label && <label htmlFor={props.id}>{label}:</label>}

      <div className={styles.textareaContainer}>
        <TextareaAutosize
          value={textValue}
          maxRows={20}
          disabled
          className={styles.textarea}
          {...props}
        />

        <button
          type="button"
          className={styles.copyButton}
          onClick={handleCopy}
        >
          Copy
        </button>
      </div>
    </Row>
  );
}
