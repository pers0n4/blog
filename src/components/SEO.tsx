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

      <link
        rel="icon"
        href="/icons/icon@48.png"
        type="image/png"
        sizes="48x48"
      />
      <link
        rel="icon"
        href="/icons/icon@72.png"
        type="image/png"
        sizes="72x72"
      />
      <link
        rel="icon"
        href="/icons/icon@96.png"
        type="image/png"
        sizes="96x96"
      />
      <link
        rel="icon"
        href="/icons/icon@144.png"
        sizes="144x144"
        type="image/png"
      />
      <link
        rel="icon"
        href="/icons/icon@192.png"
        type="image/png"
        sizes="192x192"
      />
      <link
        rel="icon"
        href="/icons/icon@256.png"
        type="image/png"
        sizes="256x256"
      />
      <link
        rel="icon"
        href="/icons/icon@384.png"
        type="image/png"
        sizes="384x384"
      />
      <link
        rel="icon"
        href="/icons/icon@512.png"
        type="image/png"
        sizes="512x512"
      />
    </Helmet>
  );
};

SEO.defaultProps = {
  title: "",
  description: "",
  type: "website",
};

export default SEO;
