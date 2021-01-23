import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import {
  createStyles,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import MDXComponents from './MDXComponents';
import ArticleHeader from './ArticleHeader';
import ArticleFooter from './ArticleFooter';
import ArticleComments from './ArticleComments';
import ArticleTableOfContents from './ArticleTableOfContents';
import type { ArticleProps } from '../../graphql';

const useStyles = makeStyles(() =>
  createStyles({
    article: {
      padding: '1rem',
    },
    comments: {
      marginTop: '1.5rem',
      padding: '1rem',
      '& .utterances': {
        maxWidth: 'none',
      },
    },
  })
);

const Article: React.FC<ArticleProps> = ({ data: { mdx } }: ArticleProps) => {
  const classes = useStyles();
  const { title, date, category, tags } = mdx.frontmatter;
  const toc = mdx.tableOfContents;

  const ArticleContent = () => (
    <div>
      <MDXRenderer>{mdx.body || 'Not loaded'}</MDXRenderer>
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
                margin: '1.5rem auto',
              },
            },
            MuiTableContainer: {
              root: {
                margin: '1.5rem auto',
              },
            },
          },
        })}
      >
        {toc && Object.keys(toc).length !== 0 && (
          <ArticleTableOfContents toc={toc} />
        )}
        <Paper component="article" className={classes.article}>
          <ArticleHeader title={title} date={date} category={category} />
          <ArticleContent />
          {tags && <ArticleFooter tags={tags} />}
        </Paper>
        <Paper component="section" className={classes.comments}>
          <ArticleComments />
        </Paper>
      </ThemeProvider>
    </MDXProvider>
  );
};

export default React.memo(Article);
