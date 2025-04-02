import "./index.css";
interface chatItemInterface {
  text: string;
  time: string;
  is_me: boolean;
}

const ChatItem = (props: chatItemInterface) => {
  return (
    <div className="containerMessageItem">
      <div className="textContainer" id={props.is_me ? "isme" : "notme"}>
        <div className="text">{props.text}</div>
        <div className="time">{props.time}</div>
      </div>
    </div>
  );
};

export default ChatItem;
