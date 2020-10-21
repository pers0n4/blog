import * as React from "react";
import { MuiThemeProvider, Theme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Global } from "@emotion/core";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";

import styles from "../../styles";
import prism from "../../styles/prism";

interface Props {
  children: React.ReactElement;
  theme: Theme;
}

const TopLayout: React.FC<Props> = ({ children, theme }: Props) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <EmotionThemeProvider theme={theme}>
        <Global styles={styles} />
        <Global styles={prism} />
        {children}
      </EmotionThemeProvider>
    </MuiThemeProvider>
  );
};

export default TopLayout;
