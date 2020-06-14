import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Link } from "gatsby-theme-material-ui";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import Layout from "../components/layout";
import ArticleCard from "../components/article-card";

const useStyles = makeStyles((theme) => ({
  root: {
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
      <section className={classes.root}>{articles}</section>
    </Layout>
  );
};

Category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export default Category;

export const query = graphql`
  query($category: String) {
    allMdx(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
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
          }
        }
      }
    }
  }
`;
