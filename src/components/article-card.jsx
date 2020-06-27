import React from "react";
import PropTypes from "prop-types";
import { GatsbyLink } from "gatsby-theme-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment-timezone";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import LabelIcon from "@material-ui/icons/Label";
import Chip from "@material-ui/core/Chip";
import CardActions from "@material-ui/core/CardActions";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

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

const ArticleCard = ({
  node: {
    id,
    excerpt,
    fields: { slug },
    frontmatter: { title, date, category, tags },
  },
}) => {
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
        <CardActions disableSpacing="true">
          <div className={classes.tags}>
            <LabelIcon color="action" />
            {articleTags}
          </div>
        </CardActions>
      )}
    </Card>
  );
};

ArticleCard.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string,
    excerpt: PropTypes.string,
    fields: PropTypes.shape({
      slug: PropTypes.string,
    }),
    frontmatter: PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string,
      category: PropTypes.string,
      tags: PropTypes.array,
    }),
  }).isRequired,
};

export default ArticleCard;
