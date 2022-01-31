module.exports = {
  siteMetadata: {
    title: "Hack IT",
    description: "B와 D 사이의 C를 기술하는 블로그",
    siteUrl: "https://pers0n4.io",
    author: "Dong-Young Kim",
    email: "31337.persona@gmail.com",
    github: "pers0n4",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-typescript",
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        "~": `${__dirname}/src/`,
      },
    },
    "gatsby-theme-material-ui",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/blog/`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 900,
            },
          },
        ],
      },
    },
    "gatsby-plugin-catch-links",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-remove-trailing-slashes",
  ],
};
