import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

const Category = ({ pageContext, data }) => {
  const { category } = pageContext;
  const { edges, totalCount } = data.allMdx;
  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } in "${category}"`;

  return (
    <div>
      <h1>{categoryHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields;
          const { title } = node.frontmatter;
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          );
        })}
      </ul>
      {/*
              This links to a page that does not yet exist.
              You'll come back to it!
            */}
      <Link to="/categories">All categories</Link>
    </div>
  );
};

Category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.node.isRequired,
};

export default Category;

export const query = graphql`
  query($category: String) {
    allMdx(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
