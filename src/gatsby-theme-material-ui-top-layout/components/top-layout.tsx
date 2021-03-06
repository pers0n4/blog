import * as React from "react";

import { ThemeProvider as EmotionThemeProvider, Global } from "@emotion/react";
import {
  MuiThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core";
import type { Theme } from "@material-ui/core";

import CssBaseline from "@material-ui/core/CssBaseline";

import styles from "../styles";
import {
  DispatchContext,
  basePalette,
  baseTheme,
  themeReducer,
} from "../theme";

interface Props {
  children: React.ReactElement;
}

const TopLayout: React.FC<Props> = ({ children }: Props) => {
  const [palette, dispatch] = React.useReducer(
    themeReducer,
    basePalette("light")
  );

  const theme: Theme = React.useMemo(
    () =>
      responsiveFontSizes(
        createMuiTheme({
          ...baseTheme,
          palette: {
            ...palette,
          },
        })
      ),
    [palette]
  );

  return (
    <DispatchContext.Provider value={dispatch}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <EmotionThemeProvider theme={theme}>
          <Global styles={styles} />
          {children}
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </DispatchContext.Provider>
  );
};

export default TopLayout;
