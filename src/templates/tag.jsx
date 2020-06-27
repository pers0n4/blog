import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Link } from "gatsby-theme-material-ui";
import { makeStyles } from "@material-ui/core/styles";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";

import Layout from "../components/layout";
import ArticleCard from "../components/article-card";

const useStyles = makeStyles((theme) => ({
  articles: {
    marginTop: theme.spacing(2),
  },
}));

const Tag = ({ pageContext, data }) => {
  const classes = useStyles();
  const { tag } = pageContext;
  const { edges } = data.allMdx;
  const articles = edges
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => <ArticleCard key={edge.node.id} node={edge.node} />);

  return (
    <Layout>
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/tags/">Tags</Link>
        <Typography variant="body1" component="h1">
          {tag}
        </Typography>
      </Breadcrumbs>
      <section className={classes.articles}>{articles}</section>
    </Layout>
  );
};

Tag.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export default Tag;

export const query = graphql`
  query($tag: String) {
    allMdx(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          id
          excerpt
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
      }
    }
  }
`;
