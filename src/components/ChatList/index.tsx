import styles from "./index.module.scss";
import { BsPerson } from "react-icons/bs";
import { BsCircleFill } from "react-icons/bs";
import { formatChatTime } from "../../utils/formatTime";
interface chatInterface {
  name: string;
  message: string;
  time: string;
  count?: string;
  is_read: boolean;
  onclick?: () => void;
}

const ChatList = (props: chatInterface) => {
  return (
    <div className={styles.containerMessageList} onClick={props.onclick}>
      <div className={styles.photoProfile}>
        <BsPerson
          size={30}
          style={{ verticalAlign: "center", paddingTop: 15 }}
        />
      </div>
      <div className={styles.nameMessage}>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.message}>{props.message}</div>
      </div>
      <div className={styles.timeCount}>
        <div className={styles.time}>{formatChatTime(props.time)}</div>
        <div className={styles.count}>
          {props.is_read == false ? <BsCircleFill color="#3D3BF3" /> : ""}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
