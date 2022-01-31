import * as React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "gatsby-theme-material-ui";

import Layout from "~/components/Layout";

export default function NotFoundPage() {
  return (
    <Layout>
      <Grid
        container
        alignItems="center"
        direction="column"
        justifyContent="center"
        spacing={4}
        sx={{ mt: 24 }}
      >
        <Grid item>
          <Typography component="h1" variant="h2">
            4
            <span aria-label="0" role="img">
              😦
            </span>
            4 Not Found
          </Typography>
        </Grid>
        <Grid item>
          <Button to="/" variant="outlined">
            Back to Home
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
}
