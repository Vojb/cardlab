import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { Box, Drawer, IconButton } from "@mui/material";
import React from "react";
import {
  CardGiftcard,
  DraftsRounded,
  FormatQuoteSharp,
  Home,
  MenuTwoTone,
  Terminal,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const menuItems = [
  { text: "Hem", icon: <Home />, navigate: "/" },
  { text: "Skapa kort", icon: <CardGiftcard />, navigate: "/create-card" },
  // { text: "Skapa lag", icon: <Terminal />, navigate: "/create-team" },
  { text: "Om oss", icon: <MailIcon />, navigate: "/" },
  { text: "FAQ", icon: <FormatQuoteSharp />, navigate: "/" },
  { text: "Kontakt", icon: <DraftsRounded />, navigate: "/" },
];

const Menu = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const navigate = useNavigate();
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                onClick={() => navigate(item.navigate)}
              />
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
