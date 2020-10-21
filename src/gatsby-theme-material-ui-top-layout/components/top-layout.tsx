import * as React from "react";
import {
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
  Theme,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Global } from "@emotion/core";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";

import {
  baseTheme,
  basePalette,
  DispatchContext,
  themeReducer,
} from "../theme";
import styles from "../../styles";
import prism from "../../styles/prism";

interface Props {
  children: React.ReactElement;
}

const TopLayout: React.FC<Props> = ({ children }: Props) => {
  const [palette, dispatch] = React.useReducer(themeReducer, basePalette);

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
          <Global styles={prism} />
          {children}
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </DispatchContext.Provider>
  );
};

export default TopLayout;
