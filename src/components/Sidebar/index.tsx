import Input from "../Input";
import styles from "./index.module.scss";
import { BsPersonCircle } from "react-icons/bs";
import { BsChatSquareTextFill } from "react-icons/bs";
const Sidebar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <div>
          <h3>Pesan</h3>
        </div>
        <BsChatSquareTextFill size={25} />
      </div>
      <div className={styles.menu}>
        <h4>Semua</h4>
        <h4>Online</h4>
      </div>
      <div className={styles.search}>
        <Input placeholder="search.." />
      </div>
      <div className={styles.onlineMessages}>
        <h3>Online Now</h3>
        <div></div>
      </div>
      <div className={styles.offlineMessages}>
        <h3>Others</h3>
        <div></div>
      </div>
      <div className={styles.profile}>
        <p>Hanna</p>
        <BsPersonCircle className={styles.icon} size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
