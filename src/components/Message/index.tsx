import styles from "./index.module.scss";
import ChatItem from "../ChatItem";
import Input from "../Input";
import { BsPersonCircle } from "react-icons/bs";
import { activeMessageType, useChat } from "../../context/ChatContext";
import { UseAuth } from "../../context/AuthContext";
import { formatChatTime } from "../../utils/formatTime";
import React, { useEffect, useRef, useState } from "react";

const Message = () => {
  const { activeMessage, activeRoom } = useChat();
  const { profile } = UseAuth();
  const [text, setText] = useState("");
  const { sendMessage } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);
  const prevRoomId = useRef<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (text.length == 0) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(text);
      setText("");
    }
  };

  useEffect(() => {
    const isSameRoom = activeRoom?.id === prevRoomId.current;
    bottomRef.current?.scrollIntoView({
      behavior: isSameRoom ? "smooth" : "auto",
    });
    prevRoomId.current = activeRoom.id;
  }, [activeMessage]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <BsPersonCircle size={35} />
        </div>
        <div>
          <strong>{activeRoom.friend_username}</strong>
          <p>Online</p>
        </div>
      </div>
      <div className={styles.body}>
        {activeMessage &&
          activeMessage.length > 0 &&
          activeMessage.map((message: activeMessageType, i) => {
            return (
              <ChatItem
                key={i}
                text={message.content}
                time={formatChatTime(message.timestamp)}
                is_me={message.sender_id === profile?.id}
              ></ChatItem>
            );
          })}
        <div ref={bottomRef}></div>
      </div>
      <div className={styles.input}>
        <Input
          placeholder="send message"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default Message;
