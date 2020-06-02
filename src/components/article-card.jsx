import React from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
    frontmatter: { date, title },
  },
}) => {
  const classes = useStyles();

  return (
    <Card key={id} className={classes.card} component="article">
      <CardActionArea onClick={() => navigate(slug)}>
        <CardContent>
          <Typography className={classes.date} color="textSecondary">
            {date}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" component="p">
            {excerpt}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

ArticleCard.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ArticleCard;
