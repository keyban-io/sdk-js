import styles from "./RefreshButton.module.css";

export type RefreshButtonProps = Omit<
  React.HTMLProps<HTMLButtonElement>,
  "children" | "type"
>;

export default function RefreshButton(props: RefreshButtonProps) {
  return (
    <button className={styles.root} title="Refresh" {...props}>
      ↻
    </button>
  );
}
