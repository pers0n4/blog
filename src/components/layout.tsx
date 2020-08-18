import React from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";

import Header from "./header";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

interface Props {
  children: React.ReactElement;
}

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

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
