import * as React from "react";
import { GatsbyLink } from "gatsby-theme-material-ui";
import { kebabCase } from "lodash";

import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import LabelIcon from "@material-ui/icons/Label";
import Typography from "@material-ui/core/Typography";

import { MDXNode } from "../graphql";
import datetime from "../utils/datetime";

interface Props {
  node: MDXNode;
}

const useStyles = makeStyles((theme) => ({
  card: {
    "& + &": {
      marginTop: "1.5rem",
    },
  },
  date: {
    fontSize: "0.875rem",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

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
        size="small"
        label={tag}
        clickable
        component={GatsbyLink}
        to={`/tags/${kebabCase(tag)}`}
        key={tag}
      />
    ));

  return (
    <Card key={id} className={classes.card} component="article">
      <CardActionArea component={GatsbyLink} to={slug}>
        <CardContent>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography variant="subtitle2" component="p" color="textSecondary">
              {datetime.tz(date, "Asia/Seoul").format("YYYY-MM-DD")}
            </Typography>
            {category && (
              <Typography
                variant="subtitle2"
                component="p"
                color="textSecondary"
              >
                {category}
              </Typography>
            )}
          </Breadcrumbs>
          <Typography variant="h3" component="h2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" gutterBottom>
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
