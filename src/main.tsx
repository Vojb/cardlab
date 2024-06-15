import React from "react";
import ReactDOM from "react-dom/client";
import createTheme from "@mui/material/styles/createTheme";
import green from "@mui/material/colors/green";
import blueGrey from "@mui/material/colors/blueGrey";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import App from "./App";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: green[500],
    },
    mode: "dark",
  },
});
const lightTheme = createTheme({
  palette: {
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: green[500],
    },
    mode: "light",
  },
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
