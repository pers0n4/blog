import * as React from "react";

import { formatISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { Link } from "gatsby-theme-material-ui";
import { kebabCase } from "lodash";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

interface Props {
  title: string;
  date: string;
  category?: string;
}

const ArticleHeader: React.FC<Props> = ({ title, date, category }: Props) => {
  return (
    <header>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="textSecondary" component="p" variant="subtitle2">
          {formatISO(utcToZonedTime(date, "Asia/Seoul"), {
            representation: "date",
          })}
        </Typography>
        {category && (
          <Typography color="textSecondary" component="p" variant="subtitle2">
            <Link href={`/categories/${kebabCase(category)}/`}>{category}</Link>
          </Typography>
        )}
      </Breadcrumbs>
      <Typography component="h1" variant="h2">
        {title}
      </Typography>
      <Divider />
    </header>
  );
};

ArticleHeader.defaultProps = {
  category: "",
};

export default ArticleHeader;
