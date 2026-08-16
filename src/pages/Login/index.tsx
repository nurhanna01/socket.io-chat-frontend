import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { socket } from "../../services/socket";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../api/auth";
import toast, { Toaster } from "react-hot-toast";
import { UseAuth } from "../../context/AuthContext";

const Login = () => {
  const [, setIsConnected] = useState(socket.connected);
  const [loading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleInputUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const { saveToken } = UseAuth();

  const login = async () => {
    try {
      if (username == "") {
        setErrorMessage("Username Required!");
        return;
      } else if (password == "") {
        setErrorMessage("Password required!");
        return;
      }
      setIsLoading(true);
      const res = await loginApi(username, password);
      setIsLoading(false);
      if (res.status != 200) {
        toast.error(res.data.message);
      } else {
        toast.success("success");
        saveToken(res.data.token);
        navigate("/messages");
      }
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (username.length > 0) {
      setErrorMessage("");
    }
    if (password.length > 0) {
      setErrorMessage("");
    }
  }, [username, password]);
  return (
    <div className={styles.container}>
      <Toaster />
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
          <Button
            text="Login"
            onClickButton={login}
            disableButton={false}
            loading={loading}
          ></Button>
        </div>
        <p>
          Don't have an account yet? <a>Register here!</a>
        </p>
      </div>
    </div>
  );
};
export default Login;
