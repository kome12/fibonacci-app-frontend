import { createTheme, ThemeOptions } from "@material-ui/core/styles";

const themeOptions: ThemeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#6ac697",
      dark: "#3b7270",
    },
    secondary: {
      main: "#fff202",
    },
    background: {
      default: "#fffdff",
      paper: "#edf4f5",
    },
    text: {
      primary: "#172f4a",
      secondary: "#172F4A",
    },
  },
};

export const MyNiwaTheme = createTheme(themeOptions);
