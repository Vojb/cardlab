import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Box, Button, Drawer, IconButton, MenuPaper } from "@mui/material";
import React from "react";
import styles from "../header/header.module.scss";
import {
  DraftsRounded,
  FormatQuoteSharp,
  Home,
  MenuTwoTone,
} from "@mui/icons-material";
const menuItems = [
  { text: "Hem", icon: <Home /> },
  { text: "Om oss", icon: <MailIcon /> },
  { text: "FAQ", icon: <FormatQuoteSharp /> },
  { text: "Kontakt", icon: <DraftsRounded /> },
];
const Menu = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        onClick={() => {
          setOpen(!open);
        }}
      >
        <MenuTwoTone />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};
export default Menu;
