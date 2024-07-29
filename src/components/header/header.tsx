import { KortLabbetLogo } from "../../assets/svg/kortlabbet-logo";
import styles from "./header.module.scss";
import Menu, { menuItems } from "../meny/menu";
import { Button, Link, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className={styles.headerRoot}>
      <div className={styles.logoWrapper}>
        <div className={styles.logo} onClick={() => navigate("/")}>
          <KortLabbetLogo></KortLabbetLogo>
        </div>
      </div>

      <div className={styles.drawerMobile}>
        <Menu />
      </div>
      <div className={styles.menu}>
        {menuItems.map((item) => {
          return (
            <ListItemText
              style={{ cursor: "pointer" }}
              secondary={item.text}
              onClick={() => navigate(item.navigate)}
            />
          );
        })}
      </div>
      <div className={styles.menu}>
        <Button size={"small"} variant="contained">
          Köp
        </Button>
      </div>
    </nav>
  );
};
export default Header;
