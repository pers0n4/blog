import * as React from "react";
import {
  createMuiTheme,
  responsiveFontSizes,
  Theme,
} from "@material-ui/core/styles";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

interface ThemeDispatch {
  type: "CHANGE_THEME";
  palette: PaletteOptions;
}
type ThemeOptions = (options: PaletteOptions) => void;
type ThemeReducer = (
  state: PaletteOptions,
  action: ThemeDispatch
) => PaletteOptions;

export const DispatchContext = React.createContext<
  React.Dispatch<ThemeDispatch>
>(() => {
  throw new Error("Forgot to wrap component in `ThemeProvider`");
});

export const themeReducer: ThemeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return {
        ...state,
        ...action.palette,
      };
    default:
      throw new Error(`Unrecognized type ${action.type}`);
  }
};

export const useChangeTheme = (): ThemeOptions => {
  const dispatch = React.useContext(DispatchContext);
  return React.useCallback(
    (options) => dispatch({ type: "CHANGE_THEME", palette: options }),
    [dispatch]
  );
};

export const basePalette: PaletteOptions = {
  primary: {
    main: "#5f4b8b",
    dark: "#00abc0",
  },
  secondary: {
    main: "#373151",
  },
};

// Default Theme: https://material-ui.com/customization/default-theme/
export const baseTheme: Theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: "#5f4b8b",
      },
      secondary: {
        main: "#373151",
      },
    },
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
  })
);

export default baseTheme;
