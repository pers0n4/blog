const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require("lodash");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              category
              tags
            }
          }
        }
        categories: group(field: frontmatter___category) {
          fieldValue
        }
        tags: group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  _.each(result.data.allMdx.edges, ({ node }) => {
    const { slug } = node.fields;
    createPage({
      path: slug,
      component: require.resolve(`./src/templates/article.tsx`),
      context: {
        id: node.id,
      },
    });
  });

  _.each(result.data.allMdx.categories, (category) => {
    createPage({
      path: `/categories/${_.kebabCase(category.fieldValue)}`,
      component: require.resolve(`./src/templates/category.tsx`),
      context: {
        category: category.fieldValue,
      },
    });
  });

  _.each(result.data.allMdx.tags, (tag) => {
    createPage({
      path: `/tags/${_.toLower(tag.fieldValue)}`,
      component: require.resolve(`./src/templates/tag.tsx`),
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const path = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: `slug`,
      value: path,
    });
  }
};
