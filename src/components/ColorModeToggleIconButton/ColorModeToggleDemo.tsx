import * as React from "react";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import ColorModeToggleIconButton from "./ColorModeToggleIconButton";

export default function ColorModeToggleDemo() {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        alignItems: "center",
        bgcolor: "background.default",
        borderRadius: 1,
        color: "text.primary",
        display: "flex",
        justifyContent: "center",
        p: 3,
        width: "100%",
      }}
    >
      {palette.mode} mode
      <ColorModeToggleIconButton />
    </Box>
  );
}
