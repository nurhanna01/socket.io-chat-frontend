import styles from "./index.module.scss";
import ChatItem from "../ChatItem";
import Input from "../Input";
import { BsPersonCircle } from "react-icons/bs";
import { useChat } from "../../context/ChatContext";
import { UseAuth } from "../../context/AuthContext";
import { formatChatTime } from "../../utils/formatTime";
import { useState } from "react";
const Message = () => {
  const { activeMessage } = useChat();
  const { profile } = UseAuth();
  const [text, setText] = useState("")
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
        {activeMessage &&
          activeMessage.map((data: any, i: number) => {
            return (
              <ChatItem
                key={i}
                text={data.content}
                time={formatChatTime(data.timestamp)}
                is_me={data.sender_id === profile?.id}
              ></ChatItem>
            );
          })}
      </div>
      <div className={styles.input}>
        <Input placeholder="send message" type="textarea" value={text} onChangeButton={(e)=> setText(e.target.value)}/>
      </div>
    </div>
  );
};

export default Message;
