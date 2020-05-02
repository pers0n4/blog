import React from "react";
import PropTypes from "prop-types";
import { graphql, navigate } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

import Layout from "../components/layout";

const useStyles = makeStyles({
  card: {
    "& + &": {
      marginTop: "1.5rem",
    },
  },
  date: {
    fontSize: "0.875rem",
  },
});

const Article = ({
  node: {
    id,
    excerpt,
    fields: { slug },
    frontmatter: { date, title },
  },
}) => {
  const classes = useStyles();

  return (
    <Card key={id} className={classes.card} component="article">
      <CardActionArea onClick={() => navigate(slug)}>
        <CardContent>
          <Typography className={classes.date} color="textSecondary">
            {date}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" component="p">
            {excerpt}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

Article.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
    frontmatter: PropTypes.shape({
      path: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const Index = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const articles = edges
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => <Article key={edge.node.id} node={edge.node} />);

  return (
    <Layout>
      <section>{articles}</section>
    </Layout>
  );
};

Index.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Index;

export const query = graphql`
  query ArticleList {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`;
