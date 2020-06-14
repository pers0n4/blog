import React from "react";
import PropTypes from "prop-types";
import { GatsbyLink } from "gatsby-theme-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment-timezone";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles({
  card: {
    "& + &": {
      marginTop: "1.5rem",
    },
  },
  date: {
    fontSize: "0.875rem",
  },
});

const ArticleCard = ({
  node: {
    id,
    excerpt,
    fields: { slug },
    frontmatter: { title, date },
  },
}) => {
  const classes = useStyles();

  return (
    <Card key={id} className={classes.card} component="article">
      <CardActionArea component={GatsbyLink} to={slug}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {excerpt}
          </Typography>
          <Typography className={classes.date} color="textSecondary">
            {moment.tz(date, "Asia/Seoul").format("YYYY-MM-DD HH:mm z")}
          </Typography>
        </CardContent>
      </CardActionArea>
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
      tags: PropTypes.array,
      date: PropTypes.string,
    }),
  }).isRequired,
};

export default ArticleCard;
