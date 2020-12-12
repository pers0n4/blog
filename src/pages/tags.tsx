import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyLink } from "gatsby-theme-material-ui";
import { toLower } from "lodash";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

import SEO from "../components/SEO";
import Layout from "../components/Layout";
import type { GroupProps } from "../graphql";

const useStyles = makeStyles((theme) =>
  createStyles({
    chips: {
      display: "flex",
      flexWrap: "wrap",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      "& > *": {
        margin: theme.spacing(0.5),
      },
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
      avatar={<Avatar>{tag.totalCount}</Avatar>}
      label={tag.fieldValue}
      clickable
      component={GatsbyLink}
      to={`/tags/${toLower(tag.fieldValue)}/`}
      key={tag.fieldValue}
    />
  ));

  return (
    <>
      <SEO title="Tags" pathname="/tags" />
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
    </>
  );
};

export default Tags;

export const query = graphql`
  query($field: MdxFieldsEnum = frontmatter___tags) {
    allMdx {
      ...Group
    }
  }
`;
