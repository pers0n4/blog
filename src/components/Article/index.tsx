import * as React from "react";
import { GatsbyLink } from "gatsby-theme-material-ui";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { toLower } from "lodash";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import LabelIcon from "@material-ui/icons/Label";
import Paper from "@material-ui/core/Paper";

import components from "./components";
import { ArticleProps } from "../../graphql";
import ArticleHeader from "./ArticleHeader";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: "1rem",
    },
    divider: {
      margin: "1.5rem auto",
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
  })
);

const Article: React.FC<ArticleProps> = ({ data: { mdx } }: ArticleProps) => {
  const classes = useStyles();
  const { title, date, category, tags } = mdx.frontmatter;

  const Footer = tags ? (
    <footer className={classes.tags}>
      <LabelIcon color="action" />
      {tags.map((tag) => (
        <Chip
          size="small"
          label={tag}
          clickable
          component={GatsbyLink}
          to={`/tags/${toLower(tag)}/`}
          key={tag}
        />
      ))}
    </footer>
  ) : null;

  return (
    <MDXProvider components={components}>
      <Paper component="article" className={classes.root}>
        <ArticleHeader title={title} date={date} category={category} />
        <div>
          <MDXRenderer>{mdx.body || "Not loaded"}</MDXRenderer>
        </div>
        {Footer}
      </Paper>
    </MDXProvider>
  );
};

export default Article;
