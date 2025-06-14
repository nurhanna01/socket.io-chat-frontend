import "./index.css";
import InputForm from "../../components/InputForm";
import ChatList from "../../components/ChatList";
import React, { useEffect, useState } from "react";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  messagesInterface,
  profileInterface,
} from "../../interfaces/interface";
import { clickChatState } from "../OnlineUsers";
import { socket } from "../../services/socket";
import { FaPowerOff } from "react-icons/fa6";

const Messages = () => {
  const [message, setMessage] = useState<messagesInterface | null>(null);
  const [profile, setProfile] = useState<profileInterface | null>(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const today = moment.utc().startOf("day");

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    setProfile(JSON.parse(storedProfile || ""));
    const storedMessage = localStorage.getItem("messages");
    setMessage(JSON.parse(storedMessage || ""));

    socket.on("UPDATE_LIST_MESSAGE", (data) => {
      setMessage(data.message);
      localStorage.setItem("messages", JSON.stringify(data.message));
    });
    return () => {};
  }, []);

  useEffect(() => {
    socket.on("RECEIVE_MESSAGE", () => {
      if (profile && profile.id) {
        socket.emit("RECEIVE_MESSAGE", {
          user_id: profile?.id,
        });
      }
    });
  }, [profile]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleClickAdd = () => {
    navigate("/online");
  };

  const handleClickChat = (data: clickChatState) => {
    console.log(data, "data chat");
    navigate("/chat", { state: { data } });
  };

  return (
    <div className="wrapper">
      <div className="containerMessages">
        <div className="containerTitle">
          <p className="title">Messages</p>
          <div className="iconOff">
            <FaPowerOff color="red" size={30} />
          </div>
        </div>
        <div className="header">
          <div className="containerInput">
            <InputForm
              value={search}
              onChangeButton={handleSearch}
              placeholder="search"
            />
          </div>
          <div className="addChat" onClick={handleClickAdd}>
            <BsFillPlusSquareFill
              color="#3D3BF3"
              size={30}
              className="iconAdd"
            />
          </div>
        </div>
        <div className="list">
          {Object.values(message ?? {}).map((e: messagesInterface, i) => {
            const last_index = e.list_message.length - 1;
            return (
              <ChatList
                key={i}
                message={e.list_message[last_index].content}
                name={
                  profile?.id == e.list_message[last_index].receiver_id
                    ? e.list_message[last_index].sender_username
                    : e.list_message[last_index].receiver_username
                }
                time={
                  moment
                    .utc(e.list_message[last_index].timestamp)
                    .startOf("day")
                    .isBefore(today)
                    ? moment
                        .utc(e.list_message[last_index].timestamp)
                        .format("DD MMMM")
                    : moment
                        .utc(e.list_message[last_index].timestamp)
                        .format("HH.mm")
                }
                is_read={e.list_message[last_index].is_read == 0 ? false : true}
                onclick={() =>
                  handleClickChat({
                    id: e.friend_id,
                    username:
                      profile?.id == e.list_message[last_index].receiver_id
                        ? e.list_message[last_index].sender_username
                        : e.list_message[last_index].receiver_username,
                  })
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Messages;
