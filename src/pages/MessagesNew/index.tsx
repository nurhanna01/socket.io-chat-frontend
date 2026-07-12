import styles from "./index.module.scss";
import InputForm from "../../components/Input";
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
import Sidebar from "../../components/Sidebar";
import Message from "../../components/Message";

const MessagesNew = () => {
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
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.messages}>
        <Message />
      </div>
    </div>
  );
};

export default MessagesNew;
