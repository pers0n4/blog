import * as React from "react";
import ThemeTopLayout from "gatsby-theme-material-ui-top-layout/src/components/top-layout";
import { Global } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import { Theme } from "@material-ui/core";

import styles from "../../styles";
import prism from "../../styles/prism";

interface Props {
  children: React.ReactElement;
  theme: Theme;
}

const TopLayout: React.FC<Props> = ({ children, theme }: Props) => {
  return (
    <ThemeTopLayout theme={theme}>
      <ThemeProvider theme={theme}>
        <Global styles={styles} />
        <Global styles={prism} />
        {children}
      </ThemeProvider>
    </ThemeTopLayout>
  );
};

export default TopLayout;
