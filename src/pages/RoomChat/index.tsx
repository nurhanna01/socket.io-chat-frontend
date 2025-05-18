import "./index.css";
import { BsArrowLeftSquareFill, BsPerson } from "react-icons/bs";
import { socket } from "../../services/socket";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  messagesInterface,
  profileInterface,
} from "../../interfaces/interface";
import ChatItem from "../../components/ChatItem";
import moment from "moment";
import InputForm from "../../components/InputForm";

const RoomChat = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [, setMessages] = useState<messagesInterface[] | null>(null);
  const [profile, setProfile] = useState<profileInterface | null>(null);
  const [detailMessages, setDetailMessages] =
    useState<messagesInterface | null>(null);
  const [text, setText] = useState("");
  const [isUpdateMessage, setUpdateMessage] = useState(0);
  const today = moment.utc().startOf("day");
  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    setProfile(JSON.parse(storedProfile || ""));
    socket.on("DETAIL_CHAT", (data) => {
      setMessages(data);
      setDetailMessages(data);
    });
    socket.on("USERS_UPDATED", (data) => {
      localStorage.setItem("users", JSON.stringify(data));
    });

    const listMessage = localStorage.getItem("messages");
    setMessages(JSON.parse(listMessage || ""));

    socket.on("RECEIVE_MESSAGE", () => {
      console.log("INI KALAU RECEIVE MESSAGEs");
      if (profile && profile.id) {
        socket.emit("DETAIL_CHAT", {
          my_id: profile?.id,
          friend_id: state?.data.id,
        });
      }
    });

    socket.on("SUCCESS_SAVE_MESSAGE", () => {
      if (profile && profile.id) {
        socket.emit("DETAIL_CHAT", {
          my_id: profile?.id,
          friend_id: state?.data.id,
        });
      }
    });
  }, [state, profile]);

  useEffect(() => {
    if (profile && profile.id) {
      socket.emit("DETAIL_CHAT", {
        my_id: profile?.id,
        friend_id: state?.data.id,
      });
    }
  }, [isUpdateMessage, profile, state]);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const send = socket.emit("SEND_MESSAGE", {
        room: detailMessages?.room_id,
        content: text,
        receiver: state?.data.username,
        sender: profile?.username,
      });
      if (send) {
        setText("");
        setTimeout(() => {}, 5);
        setUpdateMessage(Date.now());
        document
          .getElementById("last-item")
          ?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  const onClickBack = () => {
    navigate(-1);
  };
  return (
    <div className="wrapper">
      <div className="containerRoom">
        <div className="headerRoom">
          <BsArrowLeftSquareFill
            className="iconBack"
            color="blue"
            size={30}
            onClick={onClickBack}
          />
          <a className="title">Chat</a>
          <div className="nameRoom">
            <BsPerson />
            {state.data.username}
          </div>
        </div>
        <div className="room">
          <div className="list">
            {detailMessages &&
              detailMessages?.list_message?.map((e, i) => {
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
            <div id="last-item"></div>
          </div>

          <div className="sendText">
            <InputForm
              onChangeButton={onChangeText}
              placeholder="send message"
              value={text}
              onKeyDown={onKeyDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomChat;
