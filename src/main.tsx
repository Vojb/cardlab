import React from "react";
import ReactDOM from "react-dom/client";
import createTheme from "@mui/material/styles/createTheme";
import green from "@mui/material/colors/green";
import blueGrey from "@mui/material/colors/blueGrey";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateCardPage from "./pages/create-card.page";
import HomePage from "./pages/home.page";
import CreateTeamPage from "./pages/create-team.page";

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
      main: blueGrey[800],
    },
    secondary: {
      main: green[400],
    },
    mode: "light",
  },
});

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Login />,
  // },
  {
    path: "/",
    element: <CreateCardPage></CreateCardPage>,
  },
  {
    path: "create-card",
    element: <CreateCardPage></CreateCardPage>,
  },
  {
    path: "create-team",
    element: <CreateTeamPage></CreateTeamPage>,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
