import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";

interface Props {
  title?: string;
  description?: string;
  type?: string;
  children?: React.ReactNode;
}

const SEO: React.FC<Props> = ({
  title,
  description,
  type,
  children,
}: Props) => {
  const {
    site: { siteMetadata: meta },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
  );

  const pageTitle = title || meta.title;
  const pageDescription = description || meta.description;
  const pageUrl = `${meta.siteUrl}${
    typeof window !== "undefined" ? window.location.pathname : ""
  }`;

  return (
    <Helmet titleTemplate={`%s | ${meta.title}`} defaultTitle={meta.title}>
      <html lang="ko" prefix="og: https://ogp.me/ns#" />

      <title>{title}</title>
      <meta name="description" content={pageDescription} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={`${meta.siteUrl}/image.png`} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="640" />
      <meta property="og:locale" content="ko_KR" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${meta.siteUrl}/image.png`} />

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

      {children}
    </Helmet>
  );
};

SEO.defaultProps = {
  title: undefined,
  description: undefined,
  type: "website",
  children: undefined,
};

export default SEO;
