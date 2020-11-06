import * as React from "react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import components from "./components";
import { ArticleProps } from "../../graphql";
import ArticleHeader from "./ArticleHeader";
import ArticleFooter from "./ArticleFooter";

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

  return (
    <MDXProvider components={components}>
      <Paper component="article" className={classes.root}>
        <ArticleHeader title={title} date={date} category={category} />
        <div>
          <MDXRenderer>{mdx.body || "Not loaded"}</MDXRenderer>
        </div>
        {tags && <ArticleFooter tags={tags} />}
      </Paper>
    </MDXProvider>
  );
};

export default Article;
