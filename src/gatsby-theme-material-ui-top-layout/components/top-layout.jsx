import React from "react";
import PropTypes from "prop-types";
import ThemeTopLayout from "gatsby-theme-material-ui-top-layout/src/components/top-layout";

import SEO from "../../components/seo";

const TopLayout = ({ children, theme }) => {
  return (
    <>
      <SEO />
      <ThemeTopLayout theme={theme}>{children}</ThemeTopLayout>
    </>
  );
};

TopLayout.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
};

export default TopLayout;
