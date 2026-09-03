import { useEffect } from "react";
import Input from "../Input";
import styles from "./index.module.scss";
import { BsPersonCircle } from "react-icons/bs";
import { BsChatSquareTextFill } from "react-icons/bs";
import { useChat } from "../../context/ChatContext";
import ChatList from "../ChatList";
const Sidebar = () => {
  const { conversations, fetchConversation } = useChat();
  useEffect(() => {
    fetchConversation();
  }, []);

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
        <Input placeholder="search.." />
      </div>
      <div className={styles.containerMessage}>
        <h3 className={styles.titleMessage}>Messages</h3>
        <div className={styles.listMessage}>
          {conversations?.length > 0 &&
            conversations.map((data: any) => (
              <ChatList
                name={data?.friend_name}
                message={data?.last_message?.content}
                time={data?.last_message?.timestamp}
                is_read={data?.last_message?.is_read}
              />
            ))}
        </div>
      </div>
      <div className={styles.profile}>
        <p>Hanna</p>
        <BsPersonCircle className={styles.icon} size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
