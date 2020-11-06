import * as React from "react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";

import {
  createStyles,
  makeStyles,
  Theme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { ArticleProps } from "../../graphql";
import ArticleHeader from "./ArticleHeader";
import ArticleFooter from "./ArticleFooter";
import MDXComponents from "./MDXComponents";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: "1rem",
    },
  })
);

const Article: React.FC<ArticleProps> = ({ data: { mdx } }: ArticleProps) => {
  const classes = useStyles();
  const { title, date, category, tags } = mdx.frontmatter;

  const ArticleContent = () => (
    <div>
      <MDXRenderer>{mdx.body || "Not loaded"}</MDXRenderer>
    </div>
  );

  return (
    <MDXProvider components={MDXComponents}>
      <ThemeProvider
        theme={(theme: Theme) => ({
          ...theme,
          overrides: {
            MuiDivider: {
              root: {
                margin: "1.5rem auto",
              },
            },
            MuiTableContainer: {
              root: {
                margin: "1.5rem auto",
              },
            },
          },
        })}
      >
        <Paper component="article" className={classes.root}>
          <ArticleHeader title={title} date={date} category={category} />
          <ArticleContent />
          {tags && <ArticleFooter tags={tags} />}
        </Paper>
      </ThemeProvider>
    </MDXProvider>
  );
};

export default Article;
