import * as React from "react";
import { Link } from "gatsby-theme-material-ui";
import { MDXProviderComponents } from "@mdx-js/react";
import { css } from "@emotion/core";

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
  style?: React.CSSProperties;
}

interface CheckboxProps {
  checked: boolean;
}

// ANCHOR styles

const textStyle: React.CSSProperties = {
  lineHeight: 1.75,
};

const headerStyle: React.CSSProperties = {
  marginTop: "0.5em",
};

const itemStyle: React.CSSProperties = {
  marginTop: "0.5rem",
  marginBottom: "0.5rem",
};

const dividerStyle: React.CSSProperties = {
  marginTop: "1rem",
  marginBottom: "1rem",
};

// ANCHOR components

const components: MDXProviderComponents = {
  p: ({ children }: ChildrenProps): JSX.Element => (
    <Typography variant="body1" gutterBottom style={textStyle}>
      {children}
    </Typography>
  ),
  h2: ({ children }: ChildrenProps): JSX.Element => (
    <Typography variant="h2" gutterBottom style={headerStyle}>
      {children}
    </Typography>
  ),
  h3: ({ children }: ChildrenProps): JSX.Element => (
    <Typography variant="h3" gutterBottom style={headerStyle}>
      {children}
    </Typography>
  ),
  h4: ({ children }: ChildrenProps): JSX.Element => (
    <Typography variant="h4" gutterBottom style={headerStyle}>
      {children}
    </Typography>
  ),
  h5: ({ children }: ChildrenProps): JSX.Element => (
    <Typography variant="h5" gutterBottom style={headerStyle}>
      {children}
    </Typography>
  ),
  h6: ({ children }: ChildrenProps): JSX.Element => (
    <Typography variant="h6" gutterBottom style={headerStyle}>
      {children}
    </Typography>
  ),
  li: ({
    children,
    id,
    className,
  }: ListItemProps & { defaultProps: Partial<ListItemProps> }): JSX.Element => (
    <Typography variant="body1" component="li" id={id} className={className}>
      {children}
    </Typography>
  ),
  table: ({ children }: ChildrenProps): JSX.Element => (
    <TableContainer component={Paper} style={itemStyle}>
      <Table>{children}</Table>
    </TableContainer>
  ),
  thead: ({ children }: ChildrenProps): JSX.Element => (
    <TableHead>{children}</TableHead>
  ),
  tbody: ({ children }: ChildrenProps): JSX.Element => (
    <TableBody>{children}</TableBody>
  ),
  tr: ({ children }: ChildrenProps): JSX.Element => (
    <TableRow>{children}</TableRow>
  ),
  th: ({
    children,
    align,
  }: TableCellProps & {
    defaultProps: Partial<TableCellProps>;
  }): JSX.Element => <TableCell align={align || "left"}>{children}</TableCell>,
  td: ({
    children,
    align,
  }: TableCellProps & {
    defaultProps: Partial<TableCellProps>;
  }): JSX.Element => <TableCell align={align || "left"}>{children}</TableCell>,
  pre: ({
    children,
    className,
    style,
  }: PreProps & { defaultProps: Partial<PreProps> }): JSX.Element => (
    <Typography
      variant="body1"
      component="pre"
      gutterBottom
      className={className}
      style={style}
    >
      {children}
    </Typography>
  ),
  hr: (): JSX.Element => <Divider style={dividerStyle} />,
  a: ({
    children,
    href,
    className,
    rel,
    target,
    style,
  }: LinkProps & { defaultProps: Partial<LinkProps> }): JSX.Element => (
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
  input: ({ checked }: CheckboxProps): JSX.Element => {
    return <Checkbox disabled checked={checked} />;
  },
};

export default components;
