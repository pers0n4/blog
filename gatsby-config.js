/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Hack IT`,
    description: `B와 D 사이의 C를 담는 기술 블로그`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-remark-images`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              wrapperStyle: `margin-top: 1rem; margin-bottom: 1rem`,
              quality: 80,
            },
          },
          `gatsby-remark-code-titles`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: false,
              noInlineHighlight: false,
              prompt: {
                user: `root`,
                host: `localhost`,
                global: false,
              },
            },
          },
          `gatsby-remark-sub-sup`,
          `gatsby-remark-abbr`,
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-theme-material-ui`,
      options: {
        webFontsConfig: {
          fonts: {
            google: [
              {
                family: `Roboto`,
                variants: [`300`, `400`, `500`],
              },
              {
                family: `Noto Sans KR`,
                variants: [`300`, `400`, `500`],
              },
            ],
          },
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-175502696-1",
        head: true,
        anonymize: true,
        respectDNT: true,
      },
    },
  ],
};
