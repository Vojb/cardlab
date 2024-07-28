import { Button, Menu, MenuItem, Stack } from "@mui/material";
import "../App.scss";
import styles from "./root-layout.module.scss";
import React, { PropsWithChildren, useEffect } from "react";
import { initDB } from "../components/indexedDb";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/header/header";
const RootLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  useEffect(() => {
    initDB();
  }, []);
  return (
    <div className={styles.rootLayout}>
      <Header></Header>
      <Outlet />
    </div>
  );
};
export default RootLayout;
