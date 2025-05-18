import "./index.css";
import { BsPerson } from "react-icons/bs";
import { BsCircleFill } from "react-icons/bs";
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
    <div className="containerMessageList" onClick={props.onclick}>
      <div className="photoProfile">
        <BsPerson
          size={60}
          style={{ verticalAlign: "center", paddingTop: 15 }}
        />
      </div>
      <div className="nameMessage">
        <div className="name">{props.name}</div>
        <div className="message">{props.message}</div>
      </div>
      <div className="timeCount">
        <div className="time">{props.time}</div>
        <div className="count">
          {props.is_read == false ? <BsCircleFill color="#3D3BF3" /> : ""}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
