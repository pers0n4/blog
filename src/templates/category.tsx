import * as React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import { graphql } from 'gatsby';
import { Link } from 'gatsby-theme-material-ui';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';

import ArticleCard from '../components/ArticleCard';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import type { ArticleListProps } from '../graphql';

interface Props extends ArticleListProps {
  pageContext: {
    category: string;
  };
}

const useStyles = makeStyles((theme) =>
  createStyles({
    articles: {
      marginTop: theme.spacing(2),
    },
  })
);

const Category: React.FC<Props> = ({ pageContext, data }: Props) => {
  const classes = useStyles();
  const { category } = pageContext;
  const { edges } = data.allMdx;
  const articles = edges
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => <ArticleCard key={edge.node.id} node={edge.node} />);

  return (
    <>
      <SEO
        pathname={`/categories/${category}`}
        title={`Category :: ${category}`}
      />
      <Layout>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/categories/">Categories</Link>
          <Typography component="h1" variant="body1">
            {category}
          </Typography>
        </Breadcrumbs>
        <section className={classes.articles}>{articles}</section>
      </Layout>
    </>
  );
};

export default Category;

export const query = graphql`
  query($category: String) {
    allMdx(
      filter: { frontmatter: { category: { eq: $category } } }
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          ...ArticleList
        }
      }
    }
  }
`;
