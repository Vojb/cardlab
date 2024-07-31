import { Button, Card, Menu, MenuItem, Stack } from "@mui/material";
import "../App.scss";
import styles from "./home.module.scss";
import React, { PropsWithChildren, useEffect } from "react";
import { initDB } from "../components/indexedDb";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/header/header";
import heroBg from "../assets/hero.png";
import BasicCard from "../components/basic-card-info";
import printer from "../assets/printer.png";
import unicorn from "../assets/unicorn.png";
import magic from "../assets/magic.png";
const HomePage = () => {
  useEffect(() => {
    initDB();
  }, []);
  return (
    <div className={styles.homePageRoot}>
      <div
        className={styles.hero}
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      ></div>
      <div className={styles.carousel}>
        <BasicCard
          icon={printer}
          title={"HÖG KVALITET"}
          body={
            "Vi samarbetar med lokala svenska tryckerier för att kunna erbjuda den bästa kvaliteten "
          }
        ></BasicCard>
        <BasicCard
          icon={unicorn}
          title={"UNIKA"}
          body={
            "Stick ut med en retro look eller välj en mer modern design. Flera val för att du skall kunna skapa samlarkort som passar just er!"
          }
          buttonText="Mer info"
        ></BasicCard>

        <BasicCard
          icon={magic}
          title={"MAGISK HJÄLP AV AI"}
          body={
            "Slipp att skriva in beskrivande texter manuellt om varje spelare. Välj några nyckelord som passar spelaren så hjälper vår assistent dig med resten"
          }
        ></BasicCard>
      </div>
    </div>
  );
};
export default HomePage;
