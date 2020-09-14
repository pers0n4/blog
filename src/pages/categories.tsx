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

import SEO from "../components/SEO";
import Layout from "../components/Layout";
import { GroupProps } from "../graphql";

const Categories: React.FC<GroupProps> = ({
  data: {
    allMdx: { group },
  },
}: GroupProps) => {
  const categories = group.map((category) => (
    <ListItem
      button
      component={GatsbyLink}
      to={`/categories/${kebabCase(category.fieldValue)}`}
      key={category.fieldValue}
    >
      <ListItemText primary={category.fieldValue} />
      <ListItemSecondaryAction>
        <Chip label={category.totalCount} />
      </ListItemSecondaryAction>
    </ListItem>
  ));

  return (
    <>
      <SEO title="Categories" pathname="/categories" />
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
    </>
  );
};

export default Categories;

export const query = graphql`
  query($field: MdxFieldsEnum = frontmatter___category) {
    allMdx(filter: { frontmatter: { draft: { ne: true } } }) {
      ...Group
    }
  }
`;
