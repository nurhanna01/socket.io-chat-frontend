import styles from "./style.module.scss";
import Input from "../Input";
import { BsXLg } from "react-icons/bs";
import { useChat } from "../../context/ChatContext";
import UserList from "../UserList";

interface OnlineUsersModalProps {
  onClose: () => void;
}

const OnlineUsersModal = (props: OnlineUsersModalProps) => {
  const { onlineUsers } = useChat();

  const handleSearch = () => {
    try {
      // TODO
    } catch (error) {
      console.error("error handleSearch:", error);
    }
  };
  const handleClick = () => {
    try {
      // TODO
      props.onClose();
    } catch (error) {
      console.error("error handleClick:", error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <strong>New Chat</strong>
          <BsXLg className={styles.close} onClick={() => props.onClose()} />
        </div>
        <Input placeholder="Search Users" onChange={handleSearch} />
        <div className={styles.list}>
          {onlineUsers &&
            onlineUsers.map((user, i) => (
              <UserList key={i} name={user.username} onClick={handleClick} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default OnlineUsersModal;
