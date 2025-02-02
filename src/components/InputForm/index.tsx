import React from "react";
import "./index.css";
interface InputInterface {
  value: string;
  onChangeButton: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputForm = (props: InputInterface) => {
  return (
    <input
      type="text"
      placeholder="username"
      className="inputForm"
      value={props.value}
      onChange={props.onChangeButton}
    />
  );
};

export default InputForm;
