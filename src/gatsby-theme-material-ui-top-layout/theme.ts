import { createTheme as createMuiTheme } from "@mui/material";
import "pretendard/dist/web/static/pretendard-dynamic-subset.css";

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
    typography: {
      fontFamily: [
        "Pretendard",
        "-apple-system",
        "BlinkMacSystemFont",
        "system-ui",
        "Roboto",
        "'Helvetica Neue'",
        "'Segoe UI'",
        "'Apple SD Gothic Neo'",
        "'Noto Sans KR'",
        "'Malgun Gothic'",
        "sans-serif",
      ].join(","),
    },
  });

export default theme;
