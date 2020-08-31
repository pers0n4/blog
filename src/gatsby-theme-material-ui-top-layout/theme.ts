import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// Default Theme: https://material-ui.com/customization/default-theme/
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
    // htmlFontSize: 16,
    fontFamily: ["Roboto", "Noto Sans KR", "sans-serif"].join(", "),
    // fontSize: 14,
    h1: {
      fontSize: "4rem",
    },
    h2: {
      fontSize: "3.25rem",
    },
    h3: {
      fontSize: "2.75rem",
    },
  },
});

export default responsiveFontSizes(theme);
