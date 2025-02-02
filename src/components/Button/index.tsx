import "./index.css";

interface buttonProps {
  text: string;
  onClickButton: () => void;
  disableButton: boolean;
}

const Button = (props: buttonProps) => {
  return (
    <button
      className="button"
      onClick={props.onClickButton}
      disabled={props.disableButton}
    >
      {props.text}
    </button>
  );
};
export default Button;
