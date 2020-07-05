import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { GatsbyLink, Link } from "gatsby-theme-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import moment from "moment-timezone";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import LabelIcon from "@material-ui/icons/Label";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import SEO from "../components/seo";
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

const useStyles = makeStyles((theme) => ({
  article: {
    padding: "1rem",
  },
  divider: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: "1rem",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  comments: {
    marginTop: "1.5rem",
    padding: "1rem",
  },
}));

const Article = ({ data: { mdx } }) => {
  const classes = useStyles();
  const { title, date, category, tags } = mdx.frontmatter;

  const articleTags =
    tags &&
    tags.map((tag) => (
      <Chip
        size="small"
        label={tag}
        clickable
        component={GatsbyLink}
        to={`/tags/${tag}/`}
        key={tag}
      />
    ));

  return (
    <>
      <SEO title={title} description={mdx.excerpt} type="article" />
      <Layout>
        <MDXProvider components={shortcodes}>
          <Paper component="article" className={classes.article}>
            <Breadcrumbs aria-label="breadcrumb">
              <Typography
                variant="subtitle2"
                component="p"
                color="textSecondary"
              >
                {moment.tz(date, "Asia/Seoul").format("YYYY-MM-DD")}
              </Typography>
              {category && (
                <Typography
                  variant="subtitle2"
                  component="p"
                  color="textSecondary"
                >
                  <Link href={`/categories/${category}/`}>{category}</Link>
                </Typography>
              )}
            </Breadcrumbs>
            <Typography variant="h1">{title}</Typography>
            <Divider className={classes.divider} />
            <MDXRenderer>{mdx.body}</MDXRenderer>
            {articleTags && (
              <div className={classes.tags}>
                <LabelIcon color="action" />
                {articleTags}
              </div>
            )}
          </Paper>
        </MDXProvider>
        <Paper className={classes.comments}>
          <script
            src="https://utteranc.es/client.js"
            repo="pers0n4/pers0n4.github.io"
            issue-term="pathname"
            theme="github-light"
            crossOrigin="anonymous"
            async
          />
        </Paper>
      </Layout>
    </>
  );
};

Article.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      id: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        category: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
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
      excerpt
      frontmatter {
        title
        date
        category
        tags
      }
    }
  }
`;
