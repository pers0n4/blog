/* eslint-disable @typescript-eslint/no-var-requires */
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require("lodash");
// require("ts-node").register({ files: true }); // eslint-disable-line import/no-extraneous-dependencies
/* eslint-enable */

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    query {
      articles: allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
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
      }
      categories: allMdx {
        group(field: frontmatter___category) {
          fieldValue
        }
      }
      tagsGroup: allMdx {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const articles = result.data.articles.edges;
  articles.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: require.resolve(`./src/templates/article/index.tsx`),
      context: {
        id: node.id,
        slug: node.fields.slug,
      },
    });
  });

  const categories = result.data.categories.group;
  categories.forEach((category) => {
    createPage({
      path: `/categories/${_.kebabCase(category.fieldValue)}/`,
      component: require.resolve(`./src/templates/category.tsx`),
      context: {
        category: category.fieldValue,
      },
    });
  });

  const tags = result.data.tagsGroup.group;
  tags.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
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
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
