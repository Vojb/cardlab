import React from "react";
import ReactDOM from "react-dom/client";
import createTheme from "@mui/material/styles/createTheme";
import green from "@mui/material/colors/green";
import blueGrey from "@mui/material/colors/blueGrey";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateCardPage from "./pages/create-card.page";
import CreateTeamPage from "./pages/create-team.page";
import "./App.scss";
import HomePage from "./pages/home.page";
import { purple } from "@mui/material/colors";
import RootLayout from "./layouts/root-layout";
const darkTheme = createTheme({
  typography: {
    fontFamily: ["Nunito Sans", "sans-serif"].join(","),
  },
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
  typography: {
    fontFamily: ["Nunito Sans", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#A882DD",
      light: "#8667b3",
      dark: "#c59bff",
    },
    secondary: {
      main: "#BCDCC4",
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
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "",
        element: <HomePage></HomePage>,
      },
      {
        path: "create-card",
        element: <CreateCardPage></CreateCardPage>,
      },
      {
        path: "create-team",
        element: <CreateTeamPage></CreateTeamPage>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
