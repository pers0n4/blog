import React from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";
import styled, { ThemeProvider } from "styled-components";

import { makeStyles } from "@material-ui/core/styles";
import MuiContainer from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";

import theme from "../gatsby-theme-material-ui-top-layout/theme";
import Header from "./header";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

const Container = styled(MuiContainer)`
  ${({ theme: t }) => `
  margin-top: 32px;
  ${t.breakpoints.down("xs")} {
    margin-top: 0;
    padding: 0;
  }
  `}
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
    <div className={classes.root}>
      <Header title={data.site.siteMetadata.title} />
      <div className={classes.content}>
        <Toolbar />
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="md">
            {children}
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
