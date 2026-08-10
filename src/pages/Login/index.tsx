import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { socket } from "../../services/socket";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [, setIsConnected] = useState(socket.connected);
  const [, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDisableJoin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("username");
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
    socket.emit("JOIN_APP", { username });
    localStorage.setItem("username", username);
    socket.on("JOIN_CONFIRMED", (data) => {
      localStorage.setItem("messages", JSON.stringify(data.message));
      localStorage.setItem("profile", JSON.stringify(data.user));
      localStorage.setItem("users", JSON.stringify(data.users));
      setIsLoading(false);
      navigate("/messages");
    });
  };

  const handleInputUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };


  const login = () => {
    if(username==""){
      setErrorMessage("Username Required!")
    }else if(password==""){
      setErrorMessage("Password required!")
    }
    return true
  };

  useEffect(() => {
    if (username.length > 0) {
      setErrorMessage("");
    }
    if (password.length > 0) {
      setErrorMessage("");
    }
    console.log(username);
  }, [username,password]);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>Online Chat App</div>
        <div>
          <div className={styles.formContainer}>
            <Input
              value={username}
              onChangeButton={handleInputUsername}
              placeholder="username"
            />
            <Input
              value={password}
              onChangeButton={handleInputPassword}
              placeholder="password"
            />
          </div>
          <div className={styles.containerMessage}>
            <span className={styles.errorMessage}>{errorMessage}</span>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button text="Login" onClickButton={login}></Button>
        </div>
        <p>Don't have an account yet? <a>Register here!</a></p>
      </div>
    </div>
  );
};
export default Login;
