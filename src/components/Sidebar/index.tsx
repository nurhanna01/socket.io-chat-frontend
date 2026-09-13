import { useEffect } from "react";
import Input from "../Input";
import styles from "./index.module.scss";
import { BsPersonCircle } from "react-icons/bs";
import { BsChatSquareTextFill } from "react-icons/bs";
import { Conversation, useChat } from "../../context/ChatContext";
import ChatList from "../ChatList";
import { UseAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const {
    conversations,
    fetchConversation,
    storeActiveRoom,
    fetchDetailConversation,
  } = useChat();

  const { profile, token } = UseAuth();

  useEffect(() => {
    fetchConversation();
  }, [token]);

  const getDetailMessage = async (room_id: number, friend_username: string) => {
    storeActiveRoom(room_id, friend_username);
    fetchDetailConversation(room_id);
  };

  const handleSearch = () => {
    try {
      // TODO
    } catch (error) {
      console.error(`error search coversation: `, error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <div>
          <h3>Pesan</h3>
        </div>
        <BsChatSquareTextFill size={25} />
      </div>
      <div className={styles.menu}>
        <h4>Semua</h4>
        <h4>Online</h4>
      </div>
      <div className={styles.search}>
        <Input placeholder="search.." onChange={handleSearch} />
      </div>
      <div className={styles.containerMessage}>
        <h3 className={styles.titleMessage}>Messages</h3>
        <div className={styles.listMessage}>
          {conversations?.length > 0 &&
            conversations.map((data: Conversation, index: number) => (
              <ChatList
                key={index}
                name={data?.friend_username}
                message={data?.last_message?.content}
                time={data?.last_message?.timestamp}
                is_read={data?.last_message?.is_read == 1}
                onclick={() =>
                  getDetailMessage(data?.room_id, data?.friend_username)
                }
              />
            ))}
        </div>
      </div>
      <div className={styles.profile}>
        <p>{profile?.username}</p>
        <BsPersonCircle className={styles.icon} size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
