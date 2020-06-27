import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import ArticleCard from "../components/article-card";

const Index = ({ data }) => {
  const { edges } = data.allMdx;
  const articles = edges
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => <ArticleCard key={edge.node.id} node={edge.node} />);

  return (
    <Layout>
      <section>{articles}</section>
    </Layout>
  );
};

Index.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export default Index;

export const query = graphql`
  query {
    allMdx(
      filter: { frontmatter: { draft: { ne: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 320)
          fields {
            slug
          }
          frontmatter {
            title
            date
            category
            tags
          }
        }
      }
    }
  }
`;
