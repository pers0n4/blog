import * as React from "react";
import { Link } from "gatsby-theme-material-ui";
import { MDXProviderComponents } from "@mdx-js/react";
import { css, CSSObject } from "@emotion/core";

import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

// ANCHOR interfaces

interface ChildrenProps {
  children: React.ReactNode;
}

interface ListItemProps extends ChildrenProps {
  id?: string;
  className?: string;
}

interface TableCellProps extends ChildrenProps {
  align?: "inherit" | "left" | "center" | "right" | "justify";
}

interface LinkProps extends ChildrenProps {
  href: string;
  className?: string;
  rel?: string;
  target?: string;
  style?: React.CSSProperties;
}

interface PreProps extends ChildrenProps {
  className?: string;
}

interface CheckboxProps {
  checked: boolean;
}

// ANCHOR styles

const styles: CSSObject = {
  text: {
    lineHeight: 1.8,
  },
  header: {
    marginTop: "0.5em",
  },
  item: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
};

// ANCHOR components

const components: MDXProviderComponents = {
  p: ({ children }: ChildrenProps): React.ReactElement => (
    <Typography variant="body1" gutterBottom css={styles.text}>
      {children}
    </Typography>
  ),
  h2: ({ children }: ChildrenProps): React.ReactElement => (
    <Typography variant="h2" gutterBottom css={styles.header}>
      {children}
    </Typography>
  ),
  h3: ({ children }: ChildrenProps): React.ReactElement => (
    <Typography variant="h3" gutterBottom css={styles.header}>
      {children}
    </Typography>
  ),
  h4: ({ children }: ChildrenProps): React.ReactElement => (
    <Typography variant="h4" gutterBottom css={styles.header}>
      {children}
    </Typography>
  ),
  h5: ({ children }: ChildrenProps): React.ReactElement => (
    <Typography variant="h5" gutterBottom css={styles.header}>
      {children}
    </Typography>
  ),
  h6: ({ children }: ChildrenProps): React.ReactElement => (
    <Typography variant="h6" gutterBottom css={styles.header}>
      {children}
    </Typography>
  ),
  li: ({
    children,
    id,
    className,
  }: ListItemProps & {
    defaultProps: Partial<ListItemProps>;
  }): React.ReactElement => (
    <Typography variant="body1" component="li" id={id} className={className}>
      {children}
    </Typography>
  ),
  table: ({ children }: ChildrenProps): React.ReactElement => (
    <TableContainer component={Paper} css={styles.item}>
      <Table>{children}</Table>
    </TableContainer>
  ),
  thead: ({ children }: ChildrenProps): React.ReactElement => (
    <TableHead>{children}</TableHead>
  ),
  tbody: ({ children }: ChildrenProps): React.ReactElement => (
    <TableBody>{children}</TableBody>
  ),
  tr: ({ children }: ChildrenProps): React.ReactElement => (
    <TableRow>{children}</TableRow>
  ),
  th: ({
    children,
    align,
  }: TableCellProps & {
    defaultProps: Partial<TableCellProps>;
  }): React.ReactElement => (
    <TableCell align={align || "left"}>{children}</TableCell>
  ),
  td: ({
    children,
    align,
  }: TableCellProps & {
    defaultProps: Partial<TableCellProps>;
  }): React.ReactElement => (
    <TableCell align={align || "left"}>{children}</TableCell>
  ),
  pre: ({
    children,
    className,
  }: PreProps & { defaultProps: Partial<PreProps> }): React.ReactElement => (
    <Typography
      variant="body1"
      component="pre"
      gutterBottom
      className={className}
      css={styles.item}
    >
      {children}
    </Typography>
  ),
  hr: (): React.ReactElement => <Divider css={styles.item} />,
  a: ({
    children,
    href,
    className,
    rel,
    target,
    style,
  }: LinkProps & { defaultProps: Partial<LinkProps> }): React.ReactElement => (
    <Link
      to={href}
      className={className}
      rel={rel}
      target={target}
      style={style}
      css={css({ fontWeight: 700 })}
    >
      {children}
    </Link>
  ),
  input: ({ checked }: CheckboxProps): React.ReactElement => {
    return <Checkbox disabled checked={checked} />;
  },
};

export default components;
