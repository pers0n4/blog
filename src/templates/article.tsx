import * as React from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from "~/components/Layout";

import type { PageProps } from "gatsby";

interface Props extends PageProps {
  data: {
    mdx: {
      id: string;
      body: string;
      frontmatter: {
        title: string;
        datePublished: string;
      };
    };
  };
}

export default function ArticleTemplate({ data }: Props) {
  const {
    mdx: {
      body,
      frontmatter: { title, datePublished },
    },
  } = data;

  return (
    <Layout>
      <Paper component="article" sx={{ p: 4 }}>
        <Typography component="h1" variant="h1">
          {title}
        </Typography>
        {datePublished}
        <MDXRenderer>{body}</MDXRenderer>
      </Paper>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ArticleQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        datePublished(formatString: "YYYY-MM-DD")
      }
    }
  }
`;
