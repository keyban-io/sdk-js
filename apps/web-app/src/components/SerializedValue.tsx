import TextareaAutosize from "react-textarea-autosize";
import type { TextareaAutosizeProps } from "react-textarea-autosize";
import styles from "./SerializedValue.module.css";

export type SerializedValueProps = Omit<
  TextareaAutosizeProps,
  "value" | "onChange"
> & {
  value: any;
};

export default function SerializedValue({
  value,
  ...props
}: SerializedValueProps) {
  return (
    <TextareaAutosize
      value={typeof value === "string" ? value : JSON.stringify(value, null, 2)}
      maxRows={20}
      {...props}
      className={`${styles.root} ${props.className}`}
    />
  );
}
