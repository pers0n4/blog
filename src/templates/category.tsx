import * as React from "react";

import { graphql } from "gatsby";
import { Link } from "gatsby-theme-material-ui";

import Layout from "~/components/Layout";

import type { PageProps } from "gatsby";

interface Props extends PageProps {
  data: {
    allMdx: {
      nodes: {
        id: string;
        fields: {
          slug: string;
        };
        frontmatter: {
          title: string;
          datePublished: string;
        };
      }[];
    };
  };
  pageContext: {
    category: string;
  };
}

export default function CategoryTemplate({
  data: {
    allMdx: { nodes },
  },
  pageContext: { category },
}: Props) {
  return (
    <Layout>
      <h2>Categories: {category}</h2>
      <ul>
        {nodes.map((node) => (
          <li key={node.id}>
            <Link to={`${node.fields.slug}`}>{node.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($category: String!) {
    allMdx(
      sort: { fields: frontmatter___datePublished, order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          datePublished(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`;
