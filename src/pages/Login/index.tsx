import { useEffect, useState } from "react";
import "./index.css";
import Button from "../../components/Button";
import InputForm from "../../components/InputForm";
import { socket } from "../../services/socket";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [, setIsConnected] = useState(socket.connected);
  const [, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [isDisableJoin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }
    socket.on("connect", () => {
      onConnect();
      console.log("socket connected =>", socket.connected);
    });
    socket.on("disconnect", onDisconnect);

    // Clean up socket events on unmount
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const handleJoin = () => {
    if (!username) {
      setErrorMessage("username required!");
      return;
    }
    setIsLoading(true);
    console.log("process join..");
    socket.emit("JOIN_APP", { username }, (response: void) => {
      try {
        console.log(response, "=>response join");
        return;
      } catch (error) {
        console.log("error join app :", error);
      }
    });
    socket.on("JOIN_CONFIRMED", (data) => {
      localStorage.setItem("messages", JSON.stringify(data.message));
      localStorage.setItem("profile", JSON.stringify(data.user));
      localStorage.setItem("users", JSON.stringify(data.users));
      setIsLoading(false);
      navigate("/messages");
    });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    if (username.length > 0) {
      setErrorMessage("");
    }
    console.log(username);
  }, [username]);
  return (
    <div className="wrapper">
      <div className="content">
        <div className="header">Online Chat App</div>
        <div>
          <div className="formContainer">
            <InputForm
              value={username}
              onChangeButton={handleInput}
              placeholder="username"
            />
          </div>
          <div className="containerMessage">
            <span className="errorMessage">{errorMessage}</span>
          </div>
        </div>
        <div className="buttonContainer">
          <Button
            text="join"
            onClickButton={handleJoin}
            disableButton={isDisableJoin}
          />
        </div>
      </div>
    </div>
  );
};
export default Login;
