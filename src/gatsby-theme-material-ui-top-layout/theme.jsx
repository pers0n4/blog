import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5f4b8b",
    },
    secondary: {
      main: "#373151",
    },
  },
  typography: {
    h1: {
      fontSize: "3rem",
    },
    h2: {
      fontSize: "2.5rem",
    },
    h3: {
      fontSize: "2.25rem",
    },
    h4: {
      fontSize: "2rem",
    },
  },
});

export default theme;
