import * as React from "react";

import { graphql } from "gatsby";
import { Link } from "gatsby-theme-material-ui";

import Layout from "~/components/Layout";

import type { PageProps } from "gatsby";

interface Props extends PageProps {
  data: {
    allMdx: {
      group: {
        fieldValue: string;
        totalCount: number;
      }[];
    };
  };
}

export default function CategoriesPage({ data }: Props) {
  return (
    <Layout>
      <h2>Categories</h2>
      <ul>
        {data.allMdx.group.map(({ fieldValue }) => (
          <li key={fieldValue}>
            <Link to={`/categories/${fieldValue}`}>{fieldValue}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    allMdx(sort: { fields: frontmatter___datePublished, order: DESC }) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;
