import styles from "./index.module.scss";
import ChatItem from "../ChatItem";
import Input from "../Input";
import { BsPersonCircle } from "react-icons/bs";
const Message = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <BsPersonCircle size={35} />
        </div>
        <div>
          <strong>Hanna</strong>
          <p>Online</p>
        </div>
      </div>
      <div className={styles.body}>
        <ChatItem text="Hello" time="12.12" is_me={true}></ChatItem>
        <ChatItem text="Hello" time="12.12" is_me={true}></ChatItem>
        <ChatItem text="Hello" time="12.12" is_me={false}></ChatItem>
      </div>
      <div className={styles.input}>
        <Input placeholder="send message" type="textarea" />
      </div>
    </div>
  );
};

export default Message;
