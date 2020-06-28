/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Hack IT`,
    description: `...`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          `gatsby-remark-images`,
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
        ],
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        ssr: false,
        displayName: true,
        fileName: true,
        minify: false,
        transpileTemplateLiterals: false,
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
    `gatsby-plugin-theme-ui`,
  ],
};
