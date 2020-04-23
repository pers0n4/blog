import React from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Header from "./header";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5f4b8b",
    },
    secondary: {
      main: "#373151",
    },
  },
});

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
}));

const Main = styled(Container)`
  margin-top: 32px;
`;

const Layout = ({ children }) => {
  const classes = useStyles();
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Header title={data.site.siteMetadata.title} />
        <Main component="main" maxWidth="md">
          {children}
        </Main>
      </div>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
