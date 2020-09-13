import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";

interface Props {
  title?: string;
  description?: string;
  type?: string;
}

const SEO: React.FC<Props> = ({ title, description, type }: Props) => {
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

  const pageTitle = title || meta.title;
  const pageDescription = description || meta.description;

  return (
    <Helmet titleTemplate={`%s | ${meta.title}`} defaultTitle={meta.title}>
      <html lang="ko" />

      <title>{title}</title>
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

SEO.defaultProps = {
  title: "",
  description: "",
  type: "website",
};

export default SEO;
