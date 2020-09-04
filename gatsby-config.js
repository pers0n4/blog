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
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              showCaptions: true,
              wrapperStyle: `margin: 1rem auto;`,
              quality: 80,
            },
          },
          `gatsby-remark-code-titles`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: `> `,
              aliases: {
                n: `none`,
                txt: `text`,
              },
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: `text`,
                  definition: {
                    text_types: /(text)/,
                  },
                },
                {
                  language: `mdx`,
                  extend: `markdown`,
                  definition: {
                    text_types: /(mdx)/,
                  },
                },
              ],
              prompt: {
                user: `root`,
                host: `localhost`,
                global: false,
              },
            },
          },
          `gatsby-remark-a11y-emoji`,
          `gatsby-remark-sub-sup`,
          `gatsby-remark-abbr`,
        ],
        /* eslint-disable global-require */
        remarkPlugins: [
          require("remark-emoji"),
          require("remark-unwrap-images"),
        ],
        /* eslint-enable */
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-theme-material-ui`,
      options: {
        webFontsConfig: {
          fonts: {
            google: [
              {
                family: `Roboto`,
                variants: [`300`, `400`, `500`, `700`],
              },
              {
                family: `Noto Sans KR`,
                variants: [`300`, `400`, `500`, `700`],
              },
              {
                family: `Fira Code`,
                variants: [`400`],
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
        trackingId: `UA-175502696-1`,
        head: true,
        anonymize: true,
        respectDNT: true,
      },
    },
  ],
};
