import * as React from "react";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import { GatsbyLink } from "gatsby-theme-material-ui";
import { toLower } from "lodash";

import Chip from "@material-ui/core/Chip";
import LabelIcon from "@material-ui/icons/Label";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(0.5),
      },
      alignItems: "center",
      display: "flex",
      flexWrap: "wrap",
      marginTop: "1rem",
    },
  })
);

interface Props {
  tags: string[];
}

const ArticleFooter: React.FC<Props> = ({ tags }: Props) => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <LabelIcon color="action" />
      {tags.map((tag) => (
        <Chip
          key={tag}
          clickable
          component={GatsbyLink}
          label={tag}
          size="small"
          to={`/tags/${toLower(tag)}/`}
        />
      ))}
    </footer>
  );
};

export default ArticleFooter;
