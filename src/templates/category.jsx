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

const Category = ({ pageContext, data }) => {
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

Category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            excerpt: PropTypes.string.isRequired,
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }).isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              category: PropTypes.string,
              tags: PropTypes.arrayOf(PropTypes.string),
            }).isRequired,
          }).isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
  }).isRequired,
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
          excerpt(pruneLength: 320, truncate: true)
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
