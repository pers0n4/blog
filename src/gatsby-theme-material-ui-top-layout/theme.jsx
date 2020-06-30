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
    // htmlFontSize: 16,
    fontFamily: ["Roboto", "Noto Sans KR", "sans-serif"].join(", "),
    // fontSize: 14,
    h1: {
      // fontWeight: 300,
      // fontSize: "6rem",
      fontSize: "4rem",
      // lineHeight: 1.167,
      // letterSpacing: "-0.01562em",
    },
    h2: {
      // fontWeight: 300,
      // fontSize: "3.75rem",
      fontSize: "3rem",
      // lineHeight: 1.2,
      // letterSpacing: "-0.00833em",
    },
    h3: {
      // fontWeight: 400,
      // fontSize: "3rem",
      fontSize: "2.5rem",
      // lineHeight: 1.167,
      // letterSpacing: "0em",
    },
    // h4: {
    //   fontWeight: 400,
    //   fontSize: "2.125rem",
    //   lineHeight: 1.235,
    //   letterSpacing: "0.00735em",
    // },
    // h5: {
    //   fontWeight: 400,
    //   fontSize: "1.5rem",
    //   lineHeight: 1.334,
    //   letterSpacing: "0em",
    // },
    // h6: {
    //   fontWeight: 500,
    //   fontSize: "1.25rem",
    //   lineHeight: 1.6,
    //   letterSpacing: "0.0075em",
    // },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "sub, sup": {
          fontSize: "75%",
          lineHeight: 0,
          position: "relative",
          verticalAlign: "baseline",
        },
        sub: {
          bottom: "-0.25em",
        },
        sup: {
          top: "-0.5em",
        },
      },
    },
  },
});

export default theme;
