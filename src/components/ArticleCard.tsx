import * as React from "react";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import { formatISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { GatsbyLink } from "gatsby-theme-material-ui";
import { toLower } from "lodash";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import LabelIcon from "@material-ui/icons/Label";

import type { MdxNode } from "../graphql";

interface Props {
  node: MdxNode;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      "& + &": {
        marginTop: "1.5rem",
      },
    },
    date: {
      fontSize: "0.875rem",
    },
    tags: {
      "& > *": {
        margin: theme.spacing(0.5),
      },
      alignItems: "center",
      display: "flex",
      flexWrap: "wrap",
    },
  })
);

const ArticleCard: React.FC<Props> = (props: Props) => {
  const {
    node: { id, excerpt, fields, frontmatter },
  } = props;
  const { slug } = fields;
  const { title, date, category, tags } = frontmatter;

  const classes = useStyles();

  const articleTags =
    tags &&
    tags.map((tag) => (
      <Chip
        key={tag}
        clickable
        component={GatsbyLink}
        label={tag}
        size="small"
        to={`/tags/${toLower(tag)}/`}
      />
    ));

  return (
    <Card key={id} className={classes.card} component="article">
      <CardActionArea component={GatsbyLink} to={slug}>
        <CardContent>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="textSecondary" component="p" variant="subtitle2">
              {formatISO(utcToZonedTime(date, "Asia/Seoul"), {
                representation: "date",
              })}
            </Typography>
            {category && (
              <Typography
                color="textSecondary"
                component="p"
                variant="subtitle2"
              >
                {category}
              </Typography>
            )}
          </Breadcrumbs>
          <Typography component="h2" gutterBottom variant="h3">
            {title}
          </Typography>
          <Typography gutterBottom variant="body2">
            {excerpt}
          </Typography>
        </CardContent>
      </CardActionArea>
      {articleTags && (
        <CardActions disableSpacing>
          <div className={classes.tags}>
            <LabelIcon color="action" />
            {articleTags}
          </div>
        </CardActions>
      )}
    </Card>
  );
};

export default ArticleCard;
