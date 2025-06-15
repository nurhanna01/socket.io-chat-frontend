import "./index.css";
// import { BsPerson } from "@react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { BsCircleFill } from "react-icons/bs";
import { BsChatLeftTextFill } from "react-icons/bs";
interface userInterface {
  name: string;
  is_online?: boolean;
  onClick: () => void;
}

const UserList = (props: userInterface) => {
  return (
    <div className="containerUserList" onClick={props.onClick}>
      <div className="photoProfile">
        <BsPerson className="icon" />
      </div>
      <div className="nameContainer">
        <div className="name">{props.name}</div>
      </div>
      <div className="onlineContainer">
        <div className="count">
          <div className="icon">
            {props.is_online == true ? <BsCircleFill color="blue" /> : ""}
            <BsChatLeftTextFill color="blue" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
