import React from "react";

import type { TextareaAutosizeProps } from "react-textarea-autosize";
import TextareaAutosize from "react-textarea-autosize";

import styles from "./SerializedValue.module.css";

export type SerializedValueProps = Omit<
  TextareaAutosizeProps,
  "value" | "onChange"
> & {
  value: string | bigint | Parameters<JSON["stringify"]>[0];
};

export default function SerializedValue({
  value,
  style,
  ...props
}: SerializedValueProps) {
  let textValue: string;
  if (typeof value === "string") textValue = value;
  else if (typeof value === "bigint") textValue = value.toString();
  else if (value == null) textValue = "";
  else
    textValue = JSON.stringify(
      value,
      (_, value) => (typeof value === "bigint" ? value.toString() : value),
      2,
    );

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(textValue);
  }, [textValue]);

  return (
    <div className={styles.root} style={style}>
      <TextareaAutosize
        value={textValue}
        maxRows={20}
        disabled
        className={styles.textarea}
        {...props}
      />

      <button type="button" className={styles.copyButton} onClick={handleCopy}>
        Copy
      </button>
    </div>
  );
}
