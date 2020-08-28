import * as React from "react";
import { graphql } from "gatsby";

import SEO from "../../components/SEO";
import Layout from "../../components/Layout";
import Article from "../../components/Article";
import Comments from "../../components/Comments";

interface Props {
  data: {
    mdx: {
      id: string;
      body: string;
      excerpt: string;
      frontmatter: {
        title: string;
        date: string;
        category?: string;
        tags?: string[];
      };
    };
  };
}
const ArticlePage: React.FC<Props> = ({ data }: Props) => {
  const { title } = data.mdx.frontmatter;
  const description = data.mdx.excerpt;

  return (
    <>
      <SEO title={title} description={description} type="article" />
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
      id
      body
      excerpt(pruneLength: 280, truncate: true)
      frontmatter {
        title
        date
        category
        tags
      }
    }
  }
`;
