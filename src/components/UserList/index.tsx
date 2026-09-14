import styles from "./index.module.scss";
import { BsPersonCircle } from "react-icons/bs";
interface userInterface {
  name: string;
  is_online?: boolean;
  onClick: () => void;
}

const UserList = (props: userInterface) => {
  return (
    <div className={styles.containerUserList} onClick={props.onClick}>
      <div className={styles.wrapper}>
        <div className={styles.photoProfile}>
          <BsPersonCircle className={styles.icon} size={25} />
          <span className={styles.onlineDot}></span>
        </div>
        <div className={styles.nameContainer}>
          <div className={styles.name}>{props.name}</div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
