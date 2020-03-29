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
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `article`,
        path: `${__dirname}/content/articles`,
      },
    },
    `gatsby-transformer-remark`,
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
  ],
};
