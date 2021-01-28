import * as React from 'react';

import { css } from '@emotion/react';
import { navigate } from 'gatsby';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';
import SEO from '../components/Seo';

const NotFound: React.FC = () => {
  return (
    <>
      <SEO title="404 Not Found" />
      <Layout>
        <Paper variant="outlined">
          <Grid
            alignItems="center"
            container
            css={css`
              padding-top: 3rem;
              padding-bottom: 3rem;
            `}
            direction="column"
            justify="center"
            spacing={3}
          >
            <Grid item>
              <Typography variant="h1">
                4
                <span aria-label="0" role="img">
                  😦
                </span>
                4 Not Found
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={() => navigate('/')}>
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
