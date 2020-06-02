import React from "react";
import PropTypes from "prop-types";

import { Link, graphql } from "gatsby";

const Categories = ({
  data: {
    allMdx: { group },
  },
}) => (
  <div>
    <div>
      <h1>Categories</h1>
      <ul>
        {group.map((category) => (
          <li key={category.fieldValue}>
            <Link to={`/categories/${category.fieldValue}/`}>
              {category.fieldValue} ({category.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

Categories.propTypes = {
  data: PropTypes.node.isRequired,
};

export default Categories;

export const pageQuery = graphql`
  query {
    allMdx(limit: 2000) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;
