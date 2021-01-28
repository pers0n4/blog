import * as React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

interface Props {
  title?: string;
  description?: string;
  pathname?: string;
  type?: string;
  children?: React.ReactNode;
}

const SEO: React.FC<Props> = ({
  title,
  description,
  pathname,
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
  const pageUrl = `${meta.siteUrl}${pathname}`;

  return (
    <Helmet
      defaultTitle={meta.title}
      defer={false}
      titleTemplate={`%s | ${meta.title}`}
    >
      <html lang="ko" prefix="og: https://ogp.me/ns#" />
      <meta
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        name="viewport"
      />

      <title>{title}</title>
      <meta content={pageDescription} name="description" />

      <meta content={pageTitle} property="og:title" />
      <meta content={pageDescription} property="og:description" />
      <meta content={type} property="og:type" />
      <meta content={pageUrl} property="og:url" />
      <meta content={`${meta.siteUrl}/og.png`} property="og:image" />
      <meta content="image/png" property="og:image:type" />
      <meta content="1280" property="og:image:width" />
      <meta content="640" property="og:image:height" />
      <meta content="ko_KR" property="og:locale" />

      <meta content="summary" name="twitter:card" />
      <meta content={pageTitle} name="twitter:title" />
      <meta content={pageDescription} name="twitter:description" />
      <meta content={`${meta.siteUrl}/og.png`} name="twitter:image" />

      <link
        href="/icons/icon@48.png"
        rel="icon"
        sizes="48x48"
        type="image/png"
      />
      <link
        href="/icons/icon@72.png"
        rel="icon"
        sizes="72x72"
        type="image/png"
      />
      <link
        href="/icons/icon@96.png"
        rel="icon"
        sizes="96x96"
        type="image/png"
      />
      <link
        href="/icons/icon@144.png"
        rel="icon"
        sizes="144x144"
        type="image/png"
      />
      <link
        href="/icons/icon@192.png"
        rel="icon"
        sizes="192x192"
        type="image/png"
      />
      <link
        href="/icons/icon@256.png"
        rel="icon"
        sizes="256x256"
        type="image/png"
      />
      <link
        href="/icons/icon@384.png"
        rel="icon"
        sizes="384x384"
        type="image/png"
      />
      <link
        href="/icons/icon@512.png"
        rel="icon"
        sizes="512x512"
        type="image/png"
      />

      {children}
    </Helmet>
  );
};

SEO.defaultProps = {
  children: undefined,
  description: '',
  pathname: '',
  title: '',
  type: 'website',
};

export default SEO;
