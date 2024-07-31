import TextareaAutosize from "react-textarea-autosize";
import type { TextareaAutosizeProps } from "react-textarea-autosize";
import styles from "./SerializedValue.module.css";
import React from "react";

export type SerializedValueProps = Omit<
  TextareaAutosizeProps,
  "value" | "onChange"
> & {
  value: string | Parameters<JSON["stringify"]>[0];
};

export default function SerializedValue({
  value,
  style,
  ...props
}: SerializedValueProps) {
  const textValue =
    typeof value === "string" ? value : JSON.stringify(value, null, 2);

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
