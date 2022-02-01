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
    label: string;
  };
}

export default function LabelTemplate({
  data: {
    allMdx: { nodes },
  },
  pageContext: { label },
}: Props) {
  return (
    <Layout>
      <h2>Labels: {label}</h2>
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
  query ($label: String!) {
    allMdx(
      sort: { fields: frontmatter___datePublished, order: DESC }
      filter: { frontmatter: { labels: { in: [$label] } } }
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
