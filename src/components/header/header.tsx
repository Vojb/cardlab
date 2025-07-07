import { KortLabbetLogo } from "../../assets/svg/kortlabbet-logo";
import styles from "./header.module.scss";
import Menu, { menuItems } from "../meny/menu";
import { Button, Link, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { exportAllData } from "../indexedDb";
import { Download } from "@mui/icons-material";

const Header = () => {
  const navigate = useNavigate();

  const handleExportData = async () => {
    try {
      const data = await exportAllData();
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `cardlab-export-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Ett fel uppstod vid export av data");
    }
  };

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
        {menuItems.map((item, index) => {
          return (
            <ListItemText
              key={index}
              style={{ cursor: "pointer" }}
              secondary={item.text}
              onClick={() => navigate(item.navigate)}
            />
          );
        })}
      </div>
      <div className={styles.menu}>
        <Button
          size={"small"}
          variant="outlined"
          startIcon={<Download />}
          onClick={handleExportData}
          style={{ marginRight: "8px" }}
        >
          Exportera data
        </Button>
        <Button size={"small"} variant="contained">
          Köp
        </Button>
      </div>
    </nav>
  );
};
export default Header;
