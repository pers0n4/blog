import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { GatsbyLink } from "gatsby-theme-material-ui";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import Layout from "../components/layout";

const Categories = ({
  data: {
    allMdx: { group },
  },
}) => {
  const categories = group.map((category) => (
    <ListItem
      button
      component={GatsbyLink}
      to={`/categories/${category.fieldValue}/`}
      key={category.fieldValue}
    >
      <ListItemText primary={category.fieldValue} />
      <ListItemSecondaryAction>
        <Chip label={category.totalCount} />
      </ListItemSecondaryAction>
    </ListItem>
  ));

  return (
    <Layout>
      <Card>
        <CardContent>
          <Typography variant="h2" component="h1" gutterBottom>
            Categories
          </Typography>
          <List>{categories}</List>
        </CardContent>
      </Card>
    </Layout>
  );
};

Categories.propTypes = {
  data: PropTypes.node.isRequired,
};

export default Categories;

export const pageQuery = graphql`
  query {
    allMdx(limit: 2000) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;
