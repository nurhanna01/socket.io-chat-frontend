import Spinner from "../Spinner/spinner";
import styles from "./index.module.scss";

interface buttonProps {
  text: string;
  onClickButton: () => void;
  disableButton: boolean;
  loading?:boolean
}

const Button = (props: buttonProps) => {
  return (
    <button
      className={styles.button}
      onClick={props.onClickButton}
      disabled={props.disableButton}
    >
      {props.loading ? <Spinner /> : props.text}
    </button>
  );
};
export default Button;
