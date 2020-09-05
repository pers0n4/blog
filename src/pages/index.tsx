import * as React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import ArticleCard from "../components/ArticleCard";
import { ArticleProps } from "../graphql";

const Index: React.FC<ArticleProps> = ({ data }: ArticleProps) => {
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
          ...Article
        }
      }
    }
  }
`;
