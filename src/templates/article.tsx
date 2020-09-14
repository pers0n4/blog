import * as React from "react";
import { graphql } from "gatsby";

import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Article from "../components/Article";
import Comments from "../components/Comments";
import { ArticleProps } from "../graphql";

const ArticlePage: React.FC<ArticleProps> = ({ data }: ArticleProps) => {
  const { title, date, tags } = data.mdx.frontmatter;
  const description = data.mdx.excerpt;
  const { slug } = data.mdx.fields;

  return (
    <>
      <SEO title={title} description={description} type="article">
        <meta property="article:published_time" content={date} />
        {tags?.map((tag) => (
          <meta property="article:tag" content={tag} />
        ))}
      </SEO>
      <Layout>
        <Article data={data} />
        <Comments repo="pers0n4/blog" issue="pathname" theme="github-light" />
      </Layout>
    </>
  );
};

export default ArticlePage;

export const query = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      ...Article
    }
  }
`;
