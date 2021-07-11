import * as React from "react";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import { graphql } from "gatsby";
import { GatsbyLink } from "gatsby-theme-material-ui";
import { toLower } from "lodash";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

import Layout from "../components/Layout";
import SEO from "../components/Seo";
import type { GroupProps } from "../graphql";

const useStyles = makeStyles((theme) =>
  createStyles({
    chips: {
      "& > *": {
        margin: theme.spacing(0.5),
      },
      display: "flex",
      flexWrap: "wrap",
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
    },
  })
);

const Tags: React.FC<GroupProps> = ({
  data: {
    allMdx: { group },
  },
}: GroupProps) => {
  const classes = useStyles();

  const tags = group.map((tag) => (
    <Chip
      key={tag.fieldValue}
      avatar={<Avatar>{tag.totalCount}</Avatar>}
      clickable
      component={GatsbyLink}
      label={tag.fieldValue}
      to={`/tags/${toLower(tag.fieldValue)}/`}
    />
  ));

  return (
    <>
      <SEO pathname="/tags" title="Tags" />
      <Layout>
        <Card>
          <CardContent>
            <Typography component="h1" gutterBottom variant="h2">
              Tags
            </Typography>
            <div className={classes.chips}>{tags}</div>
          </CardContent>
        </Card>
      </Layout>
    </>
  );
};

export default Tags;

export const query = graphql`
  query ($field: MdxFieldsEnum = frontmatter___tags) {
    allMdx {
      ...Group
    }
  }
`;
