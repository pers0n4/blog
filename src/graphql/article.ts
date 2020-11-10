import { graphql } from "gatsby";

export interface TocItem {
  url: string;
  title: string;
  items: TocItem[];
}

export interface MDXNode {
  id: string;
  body?: string;
  excerpt: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    date: string;
    category?: string;
    tags?: string[];
  };
  tableOfContents?: {
    items: TocItem[];
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
    excerpt(pruneLength: 150, truncate: true)
    frontmatter {
      title
      date
      category
      tags
    }
  }

  fragment ArticleList on Mdx {
    ...ArticleBase
    fields {
      slug
    }
  }

  fragment Article on Mdx {
    ...ArticleList
    body
    tableOfContents
  }
`;
