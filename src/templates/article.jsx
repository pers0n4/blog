import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link } from "gatsby-theme-material-ui";

import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import Layout from "../components/layout";

/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
const shortcodes = {
  p: (props) => <Typography {...props} variant="body1" gutterBottom />,
  h2: (props) => <Typography {...props} variant="h2" gutterBottom />,
  h3: (props) => <Typography {...props} variant="h3" gutterBottom />,
  h4: (props) => <Typography {...props} variant="h4" gutterBottom />,
  h5: (props) => <Typography {...props} variant="h5" gutterBottom />,
  h6: (props) => <Typography {...props} variant="h6" gutterBottom />,
  // blockquote: (props) => ,
  // ul: (props) => ,
  // ol: (props) => ,
  li: (props) => <Typography {...props} variant="body1" component="li" />,
  table: (props) => (
    <TableContainer component={Paper}>
      <Table {...props} />
    </TableContainer>
  ),
  thead: (props) => <TableHead {...props} />,
  tbody: (props) => <TableBody {...props} />,
  tr: (props) => <TableRow {...props} />,
  th: ({ children, align }) => (
    <TableCell align={align || "left"}>{children}</TableCell>
  ),
  td: ({ children, align }) => (
    <TableCell align={align || "left"}>{children}</TableCell>
  ),
  pre: (props) => (
    <Typography {...props} variant="body1" component="pre" gutterBottom />
  ),
  // code: (props) => ,
  // em: (props) => ,
  // strong: (props) => ,
  // del: (props) => ,
  hr: (props) => <Divider {...props} />,
  a: (props) => <Link {...props} />,
  // img: (props) => ,
};
/* eslint-enable */

const useStyles = makeStyles({
  root: {
    padding: "1rem",
  },
});

const Article = ({ data: { mdx } }) => {
  const classes = useStyles();
  return (
    <Layout>
      <MDXProvider components={shortcodes}>
        <Paper component="article" className={classes.root}>
          <Typography variant="h1">{mdx.frontmatter.title}</Typography>
          <Typography variant="subtitle1">{mdx.frontmatter.date}</Typography>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Paper>
      </MDXProvider>
    </Layout>
  );
};

Article.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      id: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Article;

export const query = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        date
      }
    }
  }
`;
