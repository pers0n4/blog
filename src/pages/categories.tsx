import * as React from "react";

import { graphql } from "gatsby";
import { GatsbyLink } from "gatsby-theme-material-ui";
import { kebabCase } from "lodash";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import Layout from "../components/Layout";
import SEO from "../components/Seo";

import type { GroupProps } from "../graphql";

const Categories: React.FC<GroupProps> = ({
  data: {
    allMdx: { group },
  },
}: GroupProps) => {
  const categories = group.map((category) => (
    <ListItem
      key={category.fieldValue}
      button
      component={GatsbyLink}
      to={`/categories/${kebabCase(category.fieldValue)}/`}
    >
      <ListItemText primary={category.fieldValue} />
      <ListItemSecondaryAction>
        <Chip label={category.totalCount} />
      </ListItemSecondaryAction>
    </ListItem>
  ));

  return (
    <>
      <SEO pathname="/categories" title="Categories" />
      <Layout>
        <Card>
          <CardContent>
            <Typography component="h1" gutterBottom variant="h2">
              Categories
            </Typography>
            <List>{categories}</List>
          </CardContent>
        </Card>
      </Layout>
    </>
  );
};

export default Categories;

export const query = graphql`
  query ($field: MdxFieldsEnum = frontmatter___category) {
    allMdx {
      ...Group
    }
  }
`;
