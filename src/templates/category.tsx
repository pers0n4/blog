import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "gatsby-theme-material-ui";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";

import Layout from "../components/layout";
import ArticleCard from "../components/article-card";

type Edge = {
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
      tags?: string[];
    };
  };
};

interface Props extends PageProps {
  data: {
    allMdx: {
      edges: Edge[];
    };
  };
  pageContext: {
    category: string;
  };
}

const useStyles = makeStyles((theme) => ({
  articles: {
    marginTop: theme.spacing(2),
  },
}));

const Category: React.FC<Props> = ({ pageContext, data }: Props) => {
  const classes = useStyles();
  const { category } = pageContext;
  const { edges } = data.allMdx;
  const articles = edges
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => <ArticleCard key={edge.node.id} node={edge.node} />);

  return (
    <Layout>
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/categories/">Categories</Link>
        <Typography variant="body1" component="h1">
          {category}
        </Typography>
      </Breadcrumbs>
      <section className={classes.articles}>{articles}</section>
    </Layout>
  );
};

export default Category;

export const query = graphql`
  query($category: String) {
    allMdx(
      filter: { frontmatter: { category: { eq: $category } } }
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
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
            tags
          }
        }
      }
    }
  }
`;
