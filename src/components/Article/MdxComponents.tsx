import * as React from "react";

import { css } from "@emotion/react";
import { Link } from "gatsby-theme-material-ui";
import { replace, toLower } from "lodash";

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

import type { CSSObject } from "@emotion/react";
import type { MDXProviderComponents } from "@mdx-js/react";

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
  anchor: {
    // theme.mixins.toolbar height + heading margin
    marginTop: "calc((64px + 0.5em) * -1)",

    position: "absolute",
  },
  header: {
    marginTop: "0.5em",
  },
  text: {
    lineHeight: 1.8,
  },
};

// ANCHOR components

type HeadingProps = {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: string;
  className?: string;
};

const Heading = ({ level, children, className }: HeadingProps) => (
  <Typography
    className={className}
    css={styles.header}
    gutterBottom
    variant={level}
  >
    <span css={styles.anchor} id={replace(toLower(children), " ", "-")} />
    {children}
  </Typography>
);

Heading.defaultProps = {
  className: "",
};

const MDXComponents: MDXProviderComponents = {
  a: ({
    children,
    className,
    href,
    rel,
    target,
    style,
  }: LinkProps): React.ReactElement => (
    <Link
      className={className}
      css={css({ fontWeight: 700 })}
      rel={rel}
      style={style}
      target={target}
      to={href}
    >
      {children}
    </Link>
  ),
  h1: ({ children, className }: BaseProps): React.ReactElement => {
    return (
      <Heading className={className} level="h2">
        {children as string}
      </Heading>
    );
  },
  h2: ({ children, className }: BaseProps): React.ReactElement => (
    <Heading className={className} level="h2">
      {children as string}
    </Heading>
  ),
  h3: ({ children, className }: BaseProps): React.ReactElement => (
    <Heading className={className} level="h3">
      {children as string}
    </Heading>
  ),
  h4: ({ children, className }: BaseProps): React.ReactElement => (
    <Heading className={className} level="h4">
      {children as string}
    </Heading>
  ),
  h5: ({ children, className }: BaseProps): React.ReactElement => (
    <Heading className={className} level="h5">
      {children as string}
    </Heading>
  ),
  h6: ({ children, className }: BaseProps): React.ReactElement => (
    <Heading className={className} level="h6">
      {children as string}
    </Heading>
  ),
  hr: (): React.ReactElement => <Divider />,
  input: ({ checked }: CheckboxProps): React.ReactElement => {
    return <Checkbox checked={checked} disabled />;
  },
  li: ({ children, className, id }: ListItemProps): React.ReactElement => (
    <Typography
      className={className}
      component="li"
      css={styles.text}
      id={id}
      variant="body1"
    >
      {children}
    </Typography>
  ),
  p: ({ children, className }: BaseProps): React.ReactElement => (
    <Typography
      className={className}
      css={styles.text}
      gutterBottom
      variant="body1"
    >
      {children}
    </Typography>
  ),
  pre: ({ children, className }: BaseProps): React.ReactElement => (
    <Typography
      className={className}
      component="pre"
      gutterBottom
      variant="body1"
    >
      {children}
    </Typography>
  ),
  table: ({ children, className }: BaseProps): React.ReactElement => (
    <TableContainer className={className} component={Paper}>
      <Table>{children}</Table>
    </TableContainer>
  ),
  tbody: ({ children, className }: BaseProps): React.ReactElement => (
    <TableBody className={className}>{children}</TableBody>
  ),
  td: ({ children, className, align }: TableCellProps): React.ReactElement => (
    <TableCell align={align || "left"} className={className}>
      {children}
    </TableCell>
  ),
  th: ({ children, className, align }: TableCellProps): React.ReactElement => (
    <TableCell align={align || "left"} className={className}>
      {children}
    </TableCell>
  ),
  thead: ({ children, className }: BaseProps): React.ReactElement => (
    <TableHead className={className}>{children}</TableHead>
  ),
  tr: ({ children, className }: BaseProps): React.ReactElement => (
    <TableRow className={className}>{children}</TableRow>
  ),
};

export default MDXComponents;
