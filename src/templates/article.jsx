import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Link } from "gatsby-theme-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import moment from "moment-timezone";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";

import Layout from "../components/layout";

const style = {
  marginTop: "0.5em",
};

/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
const shortcodes = {
  p: (props) => <Typography {...props} variant="body1" gutterBottom />,
  h2: (props) => (
    <Typography {...props} variant="h2" gutterBottom style={style} />
  ),
  h3: (props) => (
    <Typography {...props} variant="h3" gutterBottom style={style} />
  ),
  h4: (props) => (
    <Typography {...props} variant="h4" gutterBottom style={style} />
  ),
  h5: (props) => (
    <Typography {...props} variant="h5" gutterBottom style={style} />
  ),
  h6: (props) => (
    <Typography {...props} variant="h6" gutterBottom style={style} />
  ),
  // blockquote: (props) => ,
  // ul: (props) => ,
  // ol: (props) => ,
  li: (props) => <Typography {...props} variant="body1" component="li" />,
  table: (props) => (
    <TableContainer
      component={Paper}
      style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
    >
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
  hr: (props) => (
    <Divider {...props} style={{ marginTop: "1rem", marginBottom: "1rem" }} />
  ),
  a: (props) => <Link {...props} />,
  // img: (props) => ,
  input: (props) => {
    const { type, disabled, checked } = props;
    if (type === "checkbox") {
      return (
        <Checkbox
          disabled={disabled}
          checked={checked}
          inputProps={{
            "aria-label": `${disabled ? "disabled " : ""}${
              checked ? "checked " : ""
            }checkbox`,
          }}
        />
      );
    }
    return <input {...props} />;
  },
};
/* eslint-enable */

const useStyles = makeStyles({
  article: {
    padding: "1rem",
  },
});

const Article = ({ data: { mdx } }) => {
  const classes = useStyles();
  return (
    <Layout>
      <MDXProvider components={shortcodes}>
        <Paper component="article" className={classes.article}>
          <Typography variant="subtitle2" component="p" color="textSecondary">
            {moment
              .tz(mdx.frontmatter.date, "Asia/Seoul")
              .format("YYYY-MM-DD HH:mm z")}
          </Typography>
          <Typography variant="h1" gutterBottom>
            {mdx.frontmatter.title}
          </Typography>
          <Divider />
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Paper>
      </MDXProvider>
    </Layout>
  );
};

Article.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      id: PropTypes.string,
      body: PropTypes.string,
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
      }),
    }),
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
