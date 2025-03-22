import "./index.css";
// import { BsPerson } from "@react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { BsCircleFill } from "react-icons/bs";
interface userInterface {
  name: string;
  is_online?: boolean;
}

const UserList = (props: userInterface) => {
  return (
    <div className="containerUserList">
      <div className="photoProfile">
        <BsPerson className="icon" />
      </div>
      <div className="nameContainer">
        <div className="name">{props.name}</div>
      </div>
      <div className="onlineContainer">
        <div className="count">
          {props.is_online == true ? (
            <BsCircleFill color="blue" className="icon" />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
