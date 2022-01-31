const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { data, errors } = await graphql(`
    query {
      allMdx(sort: { fields: frontmatter___datePublished, order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (errors) {
    reporter.panicOnBuild("Error while running GraphQL query.");
    throw errors;
  }

  const { createPage } = actions;

  data.allMdx.edges.forEach(({ node }) => {
    const {
      fields: { slug },
    } = node;
    createPage({
      path: slug,
      component: require.resolve(`./src/templates/article.tsx`),
      context: {
        slug,
      },
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "Mdx") {
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: "blog/",
      trailingSlash: false,
    });
    createNodeField({
      node,
      name: "slug",
      value: `/articles${relativeFilePath}`,
    });
  }
};
