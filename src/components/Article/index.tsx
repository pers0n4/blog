import * as React from "react";

import type { Theme } from "@material-ui/core";
import {
  ThemeProvider,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Paper from "@material-ui/core/Paper";

import ArticleComments from "./ArticleComments";
import ArticleFooter from "./ArticleFooter";
import ArticleHeader from "./ArticleHeader";
import ArticleTableOfContents from "./ArticleTableOfContents";
import MDXComponents from "./MdxComponents";

import type { ArticleProps } from "../../graphql";

const useStyles = makeStyles(() =>
  createStyles({
    article: {
      padding: "1rem",
    },
    comments: {
      "& .utterances": {
        maxWidth: "none",
      },
      marginTop: "1.5rem",
      padding: "1rem",
    },
  })
);

const Article: React.FC<ArticleProps> = ({ data: { mdx } }: ArticleProps) => {
  const classes = useStyles();
  const { title, date, category, tags } = mdx.frontmatter;
  const toc = mdx.tableOfContents;
  const { body } = mdx;

  const ArticleContent = () => (
    <div>
      <MDXRenderer>{body || "Not loaded"}</MDXRenderer>
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
        {toc && Object.keys(toc).length > 0 && (
          <ArticleTableOfContents toc={toc} />
        )}
        <Paper className={classes.article} component="article">
          <ArticleHeader category={category} date={date} title={title} />
          <ArticleContent />
          {tags && <ArticleFooter tags={tags} />}
        </Paper>
        <Paper className={classes.comments} component="section">
          <ArticleComments />
        </Paper>
      </ThemeProvider>
    </MDXProvider>
  );
};

export default React.memo(Article);
