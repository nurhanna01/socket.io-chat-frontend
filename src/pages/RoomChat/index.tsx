import "./index.css";
import { BsArrowLeftSquareFill, BsPerson } from "react-icons/bs";
import { socket } from "../../services/socket";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { messagesInterface } from "../../interfaces/interface";
import ChatItem from "../../components/ChatItem";
import moment from "moment";

const RoomChat = () => {
  const { state } = useLocation();
  const [messages, setMessages] = useState<messagesInterface[] | null>(null);
  console.log(state, "ini state");
  socket.on("USERS_UPDATED", (data) => {
    localStorage.setItem("users", JSON.stringify(data));
  });
  useEffect(() => {
    const listMessage = localStorage.getItem("messages");
    setMessages(JSON.parse(listMessage || ""));
  }, []);
  const detail = messages?.filter((data) => {
    console.log(data.friend_id);
    console.log(state?.data.id);
    return data.friend_id === state?.data.id;
  });
  const today = moment.utc().startOf("day");
  console.log(detail, "detail chat");
  return (
    <div className="wrapper">
      <div className="containerRoom">
        <div className="headerRoom">
          <BsArrowLeftSquareFill className="iconBack" color="blue" size={30} />
          <a className="title">Chat</a>
        </div>
        <div className="room">
          <div className="nameRoom">
            <BsPerson />
            {state.data.username}
          </div>
          <div className="list">
            {detail &&
              detail[0]?.list_message?.map((e, i) => {
                const time = moment
                  .utc(e.timestamp)
                  .startOf("day")
                  .isBefore(today)
                  ? moment.utc(e.timestamp).format("DD MMMM")
                  : moment.utc(e.timestamp).format("HH.mm");
                return (
                  <ChatItem
                    key={i}
                    text={e.content}
                    time={time}
                    is_me={e.receiver_id === state.data.id ? true : false}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomChat;
