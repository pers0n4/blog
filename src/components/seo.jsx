import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

const SEO = ({ title, description, type }) => {
  const {
    site: { siteMetadata: meta },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  const pageTitle = title ? `${title} :: ${meta.title}` : meta.title;
  const pageDescription = description || meta.description;

  return (
    <Helmet
      titleTemplate={`%s :: ${meta.title}`}
      defaultTitle={meta.title}
      title={title}
    >
      <html lang="en" />

      <meta name="description" content={pageDescription} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={type} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
};

SEO.defaultProps = {
  title: null,
  description: null,
  type: "website",
};

export default SEO;
