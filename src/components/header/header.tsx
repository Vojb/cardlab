import { KortLabbetLogo } from "../../assets/svg/kortlabbet-logo";
import styles from "./header.module.scss";
import Menu from "../meny/menu";
const Header = () => {
  return (
    <nav className={styles.headerRoot}>
      <div className={styles.logoWrapper}>
        <div className={styles.logo}>
          <KortLabbetLogo></KortLabbetLogo>
        </div>
      </div>

      <div>
        <Menu />
      </div>
    </nav>
  );
};
export default Header;
