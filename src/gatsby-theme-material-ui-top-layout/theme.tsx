import * as React from "react";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import type { PaletteType, Theme } from "@material-ui/core";
import type { PaletteOptions } from "@material-ui/core/styles/createPalette";

type ThemeOptions = (mode: PaletteType) => void;
interface ThemeDispatch {
  type: "CHANGE_THEME";
  mode: PaletteType;
}
type ThemeReducer = (
  state: PaletteOptions,
  action: ThemeDispatch
) => PaletteOptions;

export const basePalette: (palette: PaletteType) => PaletteOptions = (
  palette
) => ({
  primary: {
    main: palette === "light" ? "#5f4b8b" : "#00abc0",
  },
  secondary: {
    main: palette === "light" ? "#0f4c81" : "#f0eee9",
  },
  type: palette,
});

export const DispatchContext = React.createContext<
  React.Dispatch<ThemeDispatch>
>(() => {
  throw new Error("Forgot to wrap component in `ThemeProvider`");
});

export const themeReducer: ThemeReducer = (_, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return {
        ...basePalette(action.mode),
      };
    default:
      throw new Error(`Unrecognized type ${action.type}`);
  }
};

export const useChangeTheme = (): ThemeOptions => {
  const dispatch = React.useContext(DispatchContext);
  return React.useCallback((mode) => dispatch({ type: "CHANGE_THEME", mode }), [
    dispatch,
  ]);
};

// Default Theme: https://material-ui.com/customization/default-theme/
export const baseTheme: Theme = createMuiTheme({
  typography: {
    // htmlFontSize: 16,
    fontFamily: [
      "Roboto",
      "Noto Sans KR",
      "Noto Color Emoji",
      "Noto Emoji",
      "sans-serif",
    ].join(", "),
    // fontSize: 14,
    h1: {
      fontSize: "4rem",
    },
    h2: {
      fontSize: "3.25rem",
    },
    h3: {
      fontSize: "2.75rem",
    },
  },
});

export default responsiveFontSizes(baseTheme);
