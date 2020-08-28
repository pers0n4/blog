import * as React from "react";
import { GatsbyLink, Link } from "gatsby-theme-material-ui";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { kebabCase } from "lodash";
import * as moment from "moment-timezone";

import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import LabelIcon from "@material-ui/icons/Label";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import components from "./components";

interface Props {
  data: {
    mdx: {
      id: string;
      body: string;
      excerpt: string;
      frontmatter: {
        title: string;
        date: string;
        category?: string;
        tags?: string[];
      };
    };
  };
}

const useStyles = makeStyles((theme) => ({
  article: {
    padding: "1rem",
  },
  divider: {
    marginTop: "1rem",
    marginBottom: "1rem",
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
}));

const Article: React.FC<Props> = ({ data: { mdx } }: Props) => {
  const classes = useStyles();
  const { title, date, category, tags } = mdx.frontmatter;

  const articleTags =
    tags &&
    tags.map((tag) => (
      <Chip
        size="small"
        label={tag}
        clickable
        component={GatsbyLink}
        to={`/tags/${kebabCase(tag)}/`}
        key={tag}
      />
    ));

  return (
    <MDXProvider components={components}>
      <Paper component="article" className={classes.article}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography variant="subtitle2" component="p" color="textSecondary">
            {moment.tz(date, "Asia/Seoul").format("YYYY-MM-DD")}
          </Typography>
          {category && (
            <Typography variant="subtitle2" component="p" color="textSecondary">
              <Link href={`/categories/${kebabCase(category)}/`}>
                {category}
              </Link>
            </Typography>
          )}
        </Breadcrumbs>
        <Typography variant="h1">{title}</Typography>
        <Divider className={classes.divider} />
        <MDXRenderer>{mdx.body}</MDXRenderer>
        {articleTags && (
          <div className={classes.tags}>
            <LabelIcon color="action" />
            {articleTags}
          </div>
        )}
      </Paper>
    </MDXProvider>
  );
};

export default Article;
