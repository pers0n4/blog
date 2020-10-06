import * as React from "react";
import { graphql } from "gatsby";

import SEO from "../components/SEO";
import Layout from "../components/Layout";
import ArticleCard from "../components/ArticleCard";
import { ArticleListProps } from "../graphql";

const Index: React.FC<ArticleListProps> = ({ data }: ArticleListProps) => {
  const { edges } = data.allMdx;
  const articles = edges
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => <ArticleCard key={edge.node.id} node={edge.node} />);

  return (
    <>
      <SEO />
      <Layout>
        <section>{articles}</section>
      </Layout>
    </>
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
          ...ArticleList
        }
      }
    }
  }
`;
