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

/* eslint-disable react/require-default-props */
interface BaseProps {
  children: React.ReactNode;
  className?: string;
}

interface ListItemProps extends BaseProps {
  id?: string;
}

interface TableCellProps extends BaseProps {
  align?: "left" | "center" | "right";
}

interface LinkProps extends BaseProps {
  href: string;
  rel?: string;
  target?: string;
  style?: React.CSSProperties;
}
/* eslint-enable */

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
};

// ANCHOR components

const MDXComponents: MDXProviderComponents = {
  p: ({ children, className }: BaseProps): React.ReactElement => (
    <Typography
      variant="body1"
      gutterBottom
      className={className}
      css={styles.text}
    >
      {children}
    </Typography>
  ),
  h2: ({ children, className }: BaseProps): React.ReactElement => (
    <Typography
      variant="h2"
      gutterBottom
      className={className}
      css={styles.header}
    >
      {children}
    </Typography>
  ),
  h3: ({ children, className }: BaseProps): React.ReactElement => (
    <Typography
      variant="h3"
      gutterBottom
      className={className}
      css={styles.header}
    >
      {children}
    </Typography>
  ),
  h4: ({ children, className }: BaseProps): React.ReactElement => (
    <Typography
      variant="h4"
      gutterBottom
      className={className}
      css={styles.header}
    >
      {children}
    </Typography>
  ),
  h5: ({ children, className }: BaseProps): React.ReactElement => (
    <Typography
      variant="h5"
      gutterBottom
      className={className}
      css={styles.header}
    >
      {children}
    </Typography>
  ),
  h6: ({ children, className }: BaseProps): React.ReactElement => (
    <Typography
      variant="h6"
      gutterBottom
      className={className}
      css={styles.header}
    >
      {children}
    </Typography>
  ),
  li: ({ children, className, id }: ListItemProps): React.ReactElement => (
    <Typography
      variant="body1"
      component="li"
      id={id}
      className={className}
      css={styles.text}
    >
      {children}
    </Typography>
  ),
  table: ({ children, className }: BaseProps): React.ReactElement => (
    <TableContainer component={Paper} className={className}>
      <Table>{children}</Table>
    </TableContainer>
  ),
  thead: ({ children, className }: BaseProps): React.ReactElement => (
    <TableHead className={className}>{children}</TableHead>
  ),
  tbody: ({ children, className }: BaseProps): React.ReactElement => (
    <TableBody className={className}>{children}</TableBody>
  ),
  tr: ({ children, className }: BaseProps): React.ReactElement => (
    <TableRow className={className}>{children}</TableRow>
  ),
  th: ({ children, className, align }: TableCellProps): React.ReactElement => (
    <TableCell align={align || "left"} className={className}>
      {children}
    </TableCell>
  ),
  td: ({ children, className, align }: TableCellProps): React.ReactElement => (
    <TableCell align={align || "left"} className={className}>
      {children}
    </TableCell>
  ),
  pre: ({ children, className }: BaseProps): React.ReactElement => (
    <Typography
      variant="body1"
      component="pre"
      gutterBottom
      className={className}
    >
      {children}
    </Typography>
  ),
  hr: (): React.ReactElement => <Divider />,
  a: ({
    children,
    className,
    href,
    rel,
    target,
    style,
  }: LinkProps): React.ReactElement => (
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

export default MDXComponents;
