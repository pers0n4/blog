import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

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
    // subtitle1: {
    //   fontWeight: 400,
    //   fontSize: "1rem",
    //   lineHeight: 1.75,
    //   letterSpacing: "0.00938em",
    // },
    // subtitle2: {
    //   fontWeight: 500,
    //   fontSize: "0.875rem",
    //   lineHeight: 1.57,
    //   letterSpacing: "0.00714em",
    // },
    // body1: {
    //   fontWeight: 400,
    //   fontSize: "1rem",
    //   lineHeight: 1.5,
    //   letterSpacing: "0.00938em",
    // },
    // body2: {
    //   fontWeight: 400,
    //   fontSize: "0.875rem",
    //   lineHeight: 1.43,
    //   letterSpacing: "0.01071em",
    // },
    // button: {
    //   fontWeight: 500,
    //   fontSize: "0.875rem",
    //   lineHeight: 1.75,
    //   letterSpacing: "0.02857em",
    //   textTransform: "uppercase",
    // },
    // caption: {
    //   fontWeight: 400,
    //   fontSize: "0.75rem",
    //   lineHeight: 1.66,
    //   letterSpacing: "0.03333em",
    // },
    // overline: {
    //   fontWeight: 400,
    //   fontSize: "0.75rem",
    //   lineHeight: 2.66,
    //   letterSpacing: "0.08333em",
    //   textTransform: "uppercase",
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

const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
