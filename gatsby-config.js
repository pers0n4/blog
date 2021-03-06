/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Hack IT",
    siteUrl: "https://pers0n4.io",
    description: "B와 D 사이의 C를 담는 기술 블로그",
  },
  flags: {
    DEV_SSR: true,
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
    LMDB_STORE: false,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-typescript",
      // options: {
      //   isTSX: true,
      //   jsxPragma: "jsx",
      //   allExtentions: true,
      // },
    },
    "gatsby-plugin-catch-links",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/content/blog/`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        plugins: [
          "gatsby-remark-images",
          {
            resolve: "gatsby-remark-images-medium-zoom",
            options: {
              margin: 50,
              background: "#212121",
              zIndex: 1299,
            },
          },
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 960,
              linkImagesToOriginal: false,
              showCaptions: true,
              wrapperStyle: "margin: 1.5rem auto;",
              quality: 80,
            },
          },
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-images-medium-zoom",
          "gatsby-remark-code-titles",
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              inlineCodeMarker: "> ",
              aliases: {
                n: "none",
                txt: "text",
              },
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: "text",
                  definition: {
                    text_types: /(text)/,
                  },
                },
                {
                  language: "mdx",
                  extend: "markdown",
                  definition: {
                    text_types: /(mdx)/,
                  },
                },
              ],
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
            },
          },
          "gatsby-remark-a11y-emoji",
          "gatsby-remark-abbr",
          "gatsby-remark-sub-sup",
        ],
        remarkPlugins: [
          require("remark-emoji"),
          require("remark-unwrap-images"),
        ],
      },
    },
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-theme-material-ui",
      options: {
        webFontsConfig: {
          fonts: {
            google: [
              {
                family: "Roboto",
                variants: ["300", "400", "500", "700"],
              },
              {
                family: "Noto Sans KR",
                variants: ["300", "400", "500", "700"],
              },
              {
                family: "Fira Code",
                variants: ["400"],
              },
            ],
          },
        },
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Hack IT",
        short_name: "Hack IT",
        start_url: "/",
        theme_color: "#5f4b8b",
        background_color: "#fafafa",
        display: "standalone",
        description: "B와 D 사이의 C를 담는 기술 블로그",
        lang: "ko-KR",
        icon: "static/icons/icon.png",
        icon_options: {
          purpose: "any maskable",
        },
        cache_busting_mode: "none",
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        workboxConfig: {
          globPatterns: ["**/icons/*"],
        },
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        exclude: ["/categories/*", "/tags/*"],
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [
          {
            userAgent: "*",
            allow: "/",
            disallow: ["/categories/*", "/tags/*"],
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                return {
                  title: edge.node.frontmatter.title,
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                };
              });
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Blog",
            // match: "^/blog/",
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: "https://pers0n4.io",
        stripQueryString: true,
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-KTC2NPD",
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
        enableWebVitalsTracking: true,
      },
    },
    "gatsby-plugin-netlify",
  ],
};
