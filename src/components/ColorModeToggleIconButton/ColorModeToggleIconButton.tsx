import * as React from "react";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";

import { ColorModeContext } from "~/gatsby-theme-material-ui-top-layout/components/context";

export default function ColorModeToggleButton() {
  const {
    palette: { mode },
  } = useTheme();
  const changeColorMode = React.useContext(ColorModeContext);
  return (
    <IconButton color="inherit" onClick={changeColorMode}>
      {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
