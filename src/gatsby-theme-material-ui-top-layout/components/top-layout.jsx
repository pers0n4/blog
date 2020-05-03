import React from "react";
import PropTypes from "prop-types";

import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "../theme";
import SEO from "../../components/seo";

const TopLayout = ({ children }) => {
  return (
    <>
      <SEO />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
};

TopLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TopLayout;
