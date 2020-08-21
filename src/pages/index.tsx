import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import ArticleCard from "../components/article-card";

interface Edge {
  node: {
    id: string;
    excerpt: string;
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
      date: string;
      category?: string;
      tags?: Array<string>;
    };
  };
}

interface Props {
  data: {
    allMdx: {
      edges: Array<Edge>;
    };
  };
}

const Index: React.FC<Props> = ({ data }: Props) => {
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
          excerpt(pruneLength: 280, truncate: true)
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
