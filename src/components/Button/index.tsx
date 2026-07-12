import styles from "./index.module.scss";

interface buttonProps {
  text: string;
  onClickButton: () => void;
  disableButton: boolean;
}

const Button = (props: buttonProps) => {
  return (
    <button
      className={styles.button}
      onClick={props.onClickButton}
      disabled={props.disableButton}
    >
      {props.text}
    </button>
  );
};
export default Button;
