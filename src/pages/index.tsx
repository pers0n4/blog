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
}

export default function IndexPage({ data }: Props) {
  return (
    <Layout>
      <ul>
        {data.allMdx.nodes.map((node) => (
          <li key={node.id}>
            <Link to={`${node.fields.slug}`}>{node.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    allMdx(sort: { fields: frontmatter___datePublished, order: DESC }) {
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
