import * as React from "react";
import { navigate } from "gatsby";
import { css } from "@emotion/core";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import SEO from "../components/SEO";
import Layout from "../components/Layout";

const NotFound: React.FC = () => {
  return (
    <>
      <SEO title="404 Not Found" />
      <Layout>
        <Paper variant="outlined">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
            css={css`
              padding-top: 3rem;
              padding-bottom: 3rem;
            `}
          >
            <Grid item>
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
        </Paper>
      </Layout>
    </>
  );
};

export default NotFound;
