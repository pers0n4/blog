import * as React from "react";
import { GatsbyLink, Link } from "gatsby-theme-material-ui";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { kebabCase } from "lodash";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import LabelIcon from "@material-ui/icons/Label";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import components from "./components";
import { ArticleProps } from "../../graphql";
import datetime from "../../utils/datetime";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: "1rem",
    },
    divider: {
      margin: "1.5rem auto",
    },
    tags: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      marginTop: "1rem",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
  })
);

const Article: React.FC<ArticleProps> = ({ data: { mdx } }: ArticleProps) => {
  const classes = useStyles();
  const { title, date, category, tags } = mdx.frontmatter;

  const Footer = tags ? (
    <footer className={classes.tags}>
      <LabelIcon color="action" />
      {tags.map((tag) => (
        <Chip
          size="small"
          label={tag}
          clickable
          component={GatsbyLink}
          to={`/tags/${kebabCase(tag)}`}
          key={tag}
        />
      ))}
    </footer>
  ) : null;

  const Header = (
    <header>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography variant="subtitle2" component="p" color="textSecondary">
          {datetime.tz(date, "Asia/Seoul").format("YYYY-MM-DD")}
        </Typography>
        {category && (
          <Typography variant="subtitle2" component="p" color="textSecondary">
            <Link href={`/categories/${kebabCase(category)}`}>{category}</Link>
          </Typography>
        )}
      </Breadcrumbs>
      <Typography variant="h1">{title}</Typography>
      <Divider className={classes.divider} />
    </header>
  );

  return (
    <MDXProvider components={components}>
      <Paper component="article" className={classes.root}>
        {Header}
        <div>
          <MDXRenderer>{mdx.body || "Not loaded"}</MDXRenderer>
        </div>
        {Footer}
      </Paper>
    </MDXProvider>
  );
};

export default Article;
