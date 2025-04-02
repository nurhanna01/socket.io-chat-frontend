import "./index.css";
import UserList from "../../components/UserList";
import { useEffect, useState } from "react";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { socket } from "../../services/socket";

const OnlineUsers = () => {
  interface Users {
    id: number;
    username: string;
    isOnline: boolean;
  }

  interface State {
    id: number;
    username: string;
  }
  const [users, setUsers] = useState([]);
  const [isUpdateUser, setIsUpdateUser] = useState(false);
  useEffect(() => {
    const getUser = localStorage.getItem("users");
    setUsers(JSON.parse(getUser || ""));
  }, [isUpdateUser]);

  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate("/messages");
  };

  const handleClickChat = (data: State) => {
    navigate("/chat", { state: { data } });
  };

  socket.on("USERS_UPDATED", (data) => {
    console.log("user update", data);
    localStorage.setItem("users", JSON.stringify(data));
    setUsers(data);
    setIsUpdateUser(true);
  });
  return (
    <div className="wrapper">
      <div className="container">
        <div className="header">
          <BsArrowLeftSquareFill
            className="iconBack"
            color="blue"
            size={30}
            onClick={handleClickBack}
          />
          <a className="title">Users</a>
        </div>
        <div className="list">
          {users?.map((e: Users) => {
            return (
              <UserList
                name={e.username}
                key={e.id}
                is_online={e.isOnline}
                onClick={() =>
                  handleClickChat({ id: e.id, username: e.username })
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OnlineUsers;
