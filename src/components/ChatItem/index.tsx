import styles from "./index.module.scss";
interface chatItemInterface {
  text: string;
  time: string;
  is_me: boolean;
}

const ChatItem = (props: chatItemInterface) => {
  return (
    <div className={styles.containerMessageItem}>
      <div
        className={`${styles.textContainer} ${props.is_me ? styles.isme : styles.notme}`}
      >
        <div className={styles.text}>{props.text}</div>
        <div className={styles.time}>{props.time}</div>
      </div>
    </div>
  );
};

export default ChatItem;
