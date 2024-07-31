import { ListItemText } from "@mui/material";
import { KortLabbetLogo } from "../../assets/svg/kortlabbet-logo";
import styles from "./footer.module.scss";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.headerRoot}>
        <div className={styles.logoWrapper}>
          <div className={styles.logo} onClick={() => navigate("/")}>
            <KortLabbetLogo></KortLabbetLogo>
          </div>
        </div>
        <div className={styles.footerContent}>
          <div className={styles.titles}>
            Kortlabbet
            <div className={styles.itemName}>Om oss </div>
            <div className={styles.itemName}>Kontakt</div>
          </div>
          <div className={styles.titles}>
            Support
            <div className={styles.itemName}>FAQ</div>
            <div className={styles.itemName}>Hjälp</div>
            <div className={styles.itemName}>Sekretesspolicy</div>
          </div>
          <div className={styles.titles}>
            Affär
            <div className={styles.itemName}>Order Status</div>
            <div className={styles.itemName}>Shopping Help</div>
          </div>
          <div className={styles.titles}>
            Socialt
            <div className={styles.itemName}>Facebook</div>
            <div className={styles.itemName}>Instagram</div>
          </div>
        </div>
      </div>
      <div className={styles.dividerSmall}></div>
      <div className={styles.footerName}>@2024 Kortlabbet AB</div>
    </div>
  );
};
export default Footer;
