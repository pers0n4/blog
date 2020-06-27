import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { GatsbyLink } from "gatsby-theme-material-ui";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";

import Layout from "../components/layout";

const useStyles = makeStyles((theme) => ({
  chips: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const Tags = ({
  data: {
    allMdx: { group },
  },
}) => {
  const classes = useStyles();

  const tags = group.map((tag) => (
    <Chip
      avatar={<Avatar>{tag.totalCount}</Avatar>}
      label={tag.fieldValue}
      clickable
      component={GatsbyLink}
      to={`/tags/${tag.fieldValue}/`}
      key={tag.fieldValue}
    />
  ));

  return (
    <Layout>
      <Card>
        <CardContent>
          <Typography variant="h2" component="h1" gutterBottom>
            Tags
          </Typography>
          <div className={classes.chips}>{tags}</div>
        </CardContent>
      </Card>
    </Layout>
  );
};

Tags.propTypes = {
  data: PropTypes.node.isRequired,
};

export default Tags;

export const pageQuery = graphql`
  query {
    allMdx(filter: { frontmatter: { draft: { ne: true } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
