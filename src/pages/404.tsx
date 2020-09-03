import * as React from "react";
import { navigate } from "gatsby";
import { css } from "@emotion/core";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

const NotFound: React.FC = () => {
  return (
    <>
      <SEO title="404 Not Found" />
      <Layout>
        <Grid container justify="center" alignItems="stretch">
          <Grid
            container
            item
            xs={12}
            justify="center"
            css={css`
              margin-top: 3rem;
              margin-bottom: 2rem;
            `}
          >
            <Typography variant="h1">
              4
              <span role="img" aria-label="0">
                😦
              </span>
              4 Not Found
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default NotFound;
