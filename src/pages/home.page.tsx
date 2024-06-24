import { Button, Menu, MenuItem, Stack } from "@mui/material";
import "../App.scss";
import styles from "./home.module.scss";
import React, { useEffect } from "react";
import { initDB } from "../components/indexedDb";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    initDB();
  }, []);
  return (
    <div className={styles.homeRoot}>
      <Button
        onClick={() => {
          navigate("/create-team");
        }}
      >
        Skapa lag
      </Button>
      <Button
        onClick={() => {
          navigate("/create-card");
        }}
      >
        Skapa kort
      </Button>
    </div>
  );
};
export default HomePage;
