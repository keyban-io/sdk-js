import styles from './Row.module.css';

export type RowProps = React.HTMLProps<HTMLDivElement>;

export default function Row(props: RowProps) {
  return <div {...props} className={`${styles.root} ${props.className}`} />;
}
