import * as React from 'react';
import { GatsbyLink } from 'gatsby-theme-material-ui';
import { toLower } from 'lodash';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import LabelIcon from '@material-ui/icons/Label';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginTop: '1rem',
      '& > *': {
        margin: theme.spacing(0.5),
      },
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
          size="small"
          label={tag}
          clickable
          component={GatsbyLink}
          to={`/tags/${toLower(tag)}/`}
          key={tag}
        />
      ))}
    </footer>
  );
};

export default ArticleFooter;
