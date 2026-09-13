import React from "react";
import style from "./index.module.scss";
import { BsEye, BsEyeSlash } from "react-icons/bs";
interface InputInterface {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}
const Input = (props: InputInterface) => {
  const typeInput = props.type || "text";
  return (
    <div className={style.wrapperInput}>
      <input
        type={props.showPassword ? "text" : typeInput}
        placeholder={props.placeholder}
        className={style.inputForm}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
      />
      {typeInput === "password" && (
        <button
          onClick={props.onTogglePassword}
          className={style.eyeButton}
          type="button"
        >
          {props.showPassword ? <BsEye /> : <BsEyeSlash />}
        </button>
      )}
    </div>
  );
};

export default Input;
