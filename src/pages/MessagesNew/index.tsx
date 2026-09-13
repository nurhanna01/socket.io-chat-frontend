import styles from "./index.module.scss";
import Sidebar from "../../components/Sidebar";
import Message from "../../components/Message";
import { useChat } from "../../context/ChatContext";

const MessagesNew = () => {
  const { activeRoom } = useChat();
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.messages}>
        {activeRoom.id != null && <Message />}
      </div>
    </div>
  );
};

export default MessagesNew;
