import * as React from "react";

import GitHubIcon from "@mui/icons-material/GitHub";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { graphql, useStaticQuery } from "gatsby";
import { IconButton } from "gatsby-theme-material-ui";

import ColorModeToggleIconButton from "~/components/ColorModeToggleIconButton";

export default function AppBarIcons() {
  const {
    site: {
      siteMetadata: { github },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          github
        }
      }
    }
  `);

  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title="GitHub profile">
        <IconButton color="inherit" to={`https://github.com/${github}`}>
          <GitHubIcon />
        </IconButton>
      </Tooltip>
      <ColorModeToggleIconButton />
    </Stack>
  );
}
