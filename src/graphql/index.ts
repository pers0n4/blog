import { graphql } from "gatsby";

interface Node {
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

export interface ArticleProps {
  data: {
    allMdx: {
      edges: Node[];
    };
  };
}

export const query = graphql`
  fragment Article on Mdx {
    id
    excerpt(pruneLength: 200, truncate: true)
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
`;
