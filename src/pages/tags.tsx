import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyLink } from "gatsby-theme-material-ui";
import { kebabCase } from "lodash";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

import Layout from "../components/Layout";

const useStyles = makeStyles((theme) => ({
  chips: {
    display: "flex",
    flexWrap: "wrap",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

type GroupItem = {
  fieldValue: string;
  totalCount: number;
};

interface Props {
  data: {
    allMdx: {
      group: Array<GroupItem>;
    };
  };
}

const Tags: React.FC<Props> = ({
  data: {
    allMdx: { group },
  },
}: Props) => {
  const classes = useStyles();

  const tags = group.map((tag) => (
    <Chip
      avatar={<Avatar>{tag.totalCount}</Avatar>}
      label={tag.fieldValue}
      clickable
      component={GatsbyLink}
      to={`/tags/${kebabCase(tag.fieldValue)}/`}
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

export default Tags;

export const query = graphql`
  query {
    allMdx(filter: { frontmatter: { draft: { ne: true } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
