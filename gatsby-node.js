const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { data, errors } = await graphql(/* graphql */ `
    query {
      allMdx(sort: { fields: frontmatter___datePublished, order: DESC }) {
        articles: edges {
          node {
            fields {
              slug
            }
            frontmatter {
              category
              labels
            }
          }
        }
        categories: group(field: frontmatter___category) {
          fieldValue
          totalCount
        }
        labels: group(field: frontmatter___labels) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  if (errors) {
    reporter.panicOnBuild("Error while running GraphQL query.");
    throw errors;
  }

  const { createPage } = actions;
  const {
    allMdx: { articles, categories, labels },
  } = data;

  articles.forEach(
    ({
      node: {
        fields: { slug },
      },
    }) => {
      createPage({
        path: slug,
        component: require.resolve("./src/templates/article.tsx"),
        context: {
          slug,
        },
      });
    },
  );

  categories.forEach(({ fieldValue }) => {
    createPage({
      // TODO: use slugify
      path: `/categories/${fieldValue}`,
      component: require.resolve("./src/templates/category.tsx"),
      context: {
        category: fieldValue,
      },
    });
  });

  labels.forEach(({ fieldValue }) => {
    createPage({
      // TODO: use slugify
      path: `/labels/${fieldValue}`,
      component: require.resolve("./src/templates/label.tsx"),
      context: {
        label: fieldValue,
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
