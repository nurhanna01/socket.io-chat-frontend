import React from "react";
import "./index.css";
interface InputInterface {
  value: string;
  onChangeButton: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
const InputForm = (props: InputInterface) => {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      className="inputForm"
      value={props.value}
      onChange={props.onChangeButton}
      onKeyDown={props.onKeyDown}
    />
  );
};

export default InputForm;
