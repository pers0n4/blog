import { graphql } from "gatsby";

export interface MDXNode {
  id: string;
  body?: string;
  excerpt: string;
  fields?: {
    slug: string;
  };
  frontmatter: {
    title: string;
    date: string;
    category?: string;
    tags?: string[];
  };
}

export interface ArticleProps {
  data: {
    mdx: MDXNode;
  };
}

export interface ArticleListProps {
  data: {
    allMdx: {
      edges: {
        node: MDXNode;
      }[];
    };
  };
}

export const query = graphql`
  fragment ArticleBase on Mdx {
    id
    excerpt(pruneLength: 200, truncate: true)
    frontmatter {
      title
      date
      category
      tags
    }
  }

  fragment Article on Mdx {
    ...ArticleBase
    body
  }

  fragment ArticleList on Mdx {
    ...ArticleBase
    fields {
      slug
    }
  }
`;
