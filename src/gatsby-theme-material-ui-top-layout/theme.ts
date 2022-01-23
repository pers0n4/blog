import { createTheme as createMuiTheme } from "@mui/material";

import type { PaletteMode, PaletteOptions } from "@mui/material";

const dark: PaletteOptions = {
  primary: {
    main: "#00abc0",
  },
  secondary: {
    main: "#f0eee9",
  },
};

const light: PaletteOptions = {
  primary: {
    main: "#5f4b8b",
  },
  secondary: {
    main: "#3178C6",
  },
};

export const theme = {
  dark,
  light,
};

export const createTheme = (mode: PaletteMode) =>
  createMuiTheme({
    palette: {
      mode,
      ...theme[mode],
    },
  });
