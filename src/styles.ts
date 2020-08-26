import { Interpolation } from "@emotion/core";

import theme from "./gatsby-theme-material-ui-top-layout/theme";

const styles: Interpolation = {
  "ol, ul": {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    marginLeft: "1.5rem",
    paddingLeft: "0",
  },
  ".contains-task-list": {
    listStyleType: "none",
  },
  blockquote: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    marginLeft: "0",
    paddingLeft: "1.5rem",
    borderLeft: `0.25rem solid ${theme.palette.divider}`,
  },
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
};

export default styles;
