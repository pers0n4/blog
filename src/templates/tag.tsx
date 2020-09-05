import * as React from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby-theme-material-ui";

import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";

import Layout from "../components/Layout";
import ArticleCard from "../components/ArticleCard";
import { ArticleProps } from "../graphql";

interface Props extends ArticleProps {
  pageContext: {
    tag: string;
  };
}

const useStyles = makeStyles((theme) => ({
  articles: {
    marginTop: theme.spacing(2),
  },
}));

const Tag: React.FC<Props> = ({ pageContext, data }: Props) => {
  const classes = useStyles();
  const { tag } = pageContext;
  const { edges } = data.allMdx;
  const articles = edges
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => <ArticleCard key={edge.node.id} node={edge.node} />);

  return (
    <Layout>
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/tags">Tags</Link>
        <Typography variant="body1" component="h1">
          {tag}
        </Typography>
      </Breadcrumbs>
      <section className={classes.articles}>{articles}</section>
    </Layout>
  );
};

export default Tag;

export const query = graphql`
  query($tag: String) {
    allMdx(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          ...Article
        }
      }
    }
  }
`;
