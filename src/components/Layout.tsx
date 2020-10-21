import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";

import Header from "./Header";

interface Props {
  children: React.ReactElement | React.ReactElement[];
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },
  })
);

const Layout: React.FC<Props> = ({ children }: Props) => {
  const classes = useStyles();
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  return (
    <div className={classes.root}>
      <Header title={data.site.siteMetadata.title} />
      <div className={classes.content}>
        <Toolbar />
        <Container
          component="main"
          maxWidth="md"
          style={{ marginTop: "32px", marginBottom: "10vh" }}
        >
          {children}
        </Container>
      </div>
    </div>
  );
};

export default Layout;
