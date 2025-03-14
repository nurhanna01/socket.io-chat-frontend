import "./index.css";
import InputForm from "../../components/InputForm";
import ChatList from "../../components/ChatList";
import React, { useEffect, useState } from "react";
import { BsFillPlusSquareFill } from "react-icons/bs";

const Messages = () => {
  interface messageInterface {
    content: string;
    sender_username: string;
    receiver_username: string;
    receiver_id: number;
    is_read: number;
    timestamp: string;
  }

  interface profileInterface {
    id: number;
    username: string;
    is_online: number;
  }
  const [message, setMessage] = useState([]);
  const [profile, setProfile] = useState<profileInterface | null>(null);
  const [search, setSearch] = useState("");

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
          <div className="addChat">
            <BsFillPlusSquareFill color="blue" size={50} className="iconAdd" />
          </div>
        </div>
        <div className="list">
          {message?.map((e: messageInterface, i) => {
            return (
              <ChatList
                key={i}
                message={e.content}
                name={
                  profile?.id == e.receiver_id
                    ? e.sender_username
                    : e.receiver_username
                }
                time={e.timestamp.split("T")[1]}
                is_read={e.is_read == 0 ? false : true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Messages;
