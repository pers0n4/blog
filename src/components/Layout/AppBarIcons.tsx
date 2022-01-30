import * as React from "react";

import GitHubIcon from "@mui/icons-material/GitHub";
import Stack from "@mui/material/Stack";
import { graphql, useStaticQuery } from "gatsby";
import { IconButton } from "gatsby-theme-material-ui";

import ColorModeToggleIconButton from "../ColorModeToggleIconButton";

export default function AppBarIcons() {
  const {
    site: {
      siteMetadata: { githubUsername },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          githubUsername
        }
      }
    }
  `);

  return (
    <Stack direction="row" spacing={1}>
      <IconButton color="inherit" to={`https://github.com/${githubUsername}`}>
        <GitHubIcon />
      </IconButton>
      <ColorModeToggleIconButton />
    </Stack>
  );
}
