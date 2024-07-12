import {
  Box,
  CircularProgress,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { enGB } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UserRepository from "../../repository/backend/UserRepository";
import axios from "axios";
import jwt from "jsonwebtoken";

export type TBaselineContext = {
  isDarkTheme: boolean;
  setIsDarkTheme: (isDarkTheme: boolean) => void;
};

const BaselineLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userRepository = new UserRepository();

    let authToken = userRepository.getTokenFromStorage();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedToken: any = jwt.decode(authToken);
    const isValid = new Date(decodedToken.exp * 1000) > new Date();

    if (!isValid) {
      userRepository.requestNewAuthtoken().then((e: boolean) => {
        console.log("here");
        console.log(e);
        authToken = userRepository.getTokenFromStorage();
        axios({
          url: "http://localhost:3000/status",
          headers: { Authorization: `bearer ${authToken}` },
        })
          .then(() => setIsLoading(false))
          .catch(() => {
            if (location.pathname !== "/anonymous/login") {
              navigate("/anonymous/login");
            }
            setIsLoading(false);
          });
      });
    } else {
      axios({
        url: "http://localhost:3000/status",
        headers: { Authorization: `bearer ${authToken}` },
      })
        .then(() => setIsLoading(false))
        .catch(() => {
          if (location.pathname !== "/anonymous/login") {
            navigate("/anonymous/login");
          }
          setIsLoading(false);
        });
    }
  }, [location.pathname, navigate]);

  const isDarkThemeStorage: boolean = JSON.parse(
    localStorage.getItem("react_theme") ?? "false"
  );

  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeStorage);

  useEffect(() => {
    localStorage.setItem("react_theme", JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  const theme = createTheme({
    palette: {
      secondary: {
        main: isDarkTheme ? grey[900] : grey[300],
      },
      mode: isDarkTheme ? "dark" : "light",
    },
  });

  const context: TBaselineContext = {
    isDarkTheme: isDarkTheme,
    setIsDarkTheme: setIsDarkTheme,
  };

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
          {isLoading ? <CircularProgress /> : <Outlet context={context} />}
        </LocalizationProvider>
      </ThemeProvider>
    </Box>
  );
};

export default BaselineLayout;
