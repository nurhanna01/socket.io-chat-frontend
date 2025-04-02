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
    return () => {};
  }, []);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleClickAdd = () => {
    navigate("/online");
  };

  return (
    <div className="wrapper">
      <div className="containerMessages">
        <div className="containerTitle">
          <p className="title">Messages</p>
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
              size={50}
              className="iconAdd"
            />
          </div>
        </div>
        <div className="list">
          {Object.values(message ?? {}).map((e: messagesInterface, i) => {
            console.log(e, "z");
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
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Messages;
