import { graphql } from "gatsby";

export interface SiteProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        siteUrl: string;
        description: string;
      };
    };
  };
}

export const query = graphql`
  fragment SiteMetadata on Site {
    siteMetadata {
      title
      siteUrl
      description
    }
  }
`;
