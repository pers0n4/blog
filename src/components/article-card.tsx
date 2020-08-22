import React from "react";
import { GatsbyLink } from "gatsby-theme-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment-timezone";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import LabelIcon from "@material-ui/icons/Label";
import Typography from "@material-ui/core/Typography";

interface Props {
  node: {
    id: string;
    excerpt: string;
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
      date: string;
      category?: string | null;
      tags?: string[] | null;
    };
  };
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

const ArticleCard: React.FC<Props> = ({
  node: {
    id,
    excerpt,
    fields: { slug },
    frontmatter: { title, date, category, tags },
  },
}: Props) => {
  const classes = useStyles();

  const articleTags =
    tags &&
    tags.map((tag) => (
      <Chip
        size="small"
        label={tag}
        clickable
        component={GatsbyLink}
        to={`/tags/${tag}/`}
        key={tag}
      />
    ));

  return (
    <Card key={id} className={classes.card} component="article">
      <CardActionArea component={GatsbyLink} to={slug}>
        <CardContent>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography variant="subtitle2" component="p" color="textSecondary">
              {moment.tz(date, "Asia/Seoul").format("YYYY-MM-DD")}
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
          <Typography variant="h2" component="h2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" gutterBottom>
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
