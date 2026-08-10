import React from "react";
import style from "./index.module.scss";
interface InputInterface {
  value: string;
  onChangeButton: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
}
const Input = (props: InputInterface) => {
  const typeInput = props.type || "text";
  return (
    <input
      type={typeInput}
      placeholder={props.placeholder}
      className={style.inputForm}
      value={props.value}
      onChange={props.onChangeButton}
      onKeyDown={props.onKeyDown}
    />
  );
};

export default Input;
