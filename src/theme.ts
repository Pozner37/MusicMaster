import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#64b5f6",
      contrastText: "#ffffff",
    },
    background: {
      default: "#121212",
      paper: "#FFEDFB",
    },
    text: {
      primary: "#000000",
    },
    info: {
      main: "#ffffff",
    },
    success: {
      main: "#5af500",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1.5rem",
          width: "15rem",
        },
      },
      defaultProps: {
        variant: "contained",
      },
    },
  },
  typography: {
    fontFamily: "MusicMasterFont",
    fontSize: 16,
  },
});
