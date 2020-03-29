import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
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

const Main = styled(Container)`
  margin-top: 32px;
`;

const Layout = ({ children }) => {
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
      <Header title={data.site.siteMetadata.title} />
      <Toolbar />
      <Main component="main" maxWidth="md">
        {children}
      </Main>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
