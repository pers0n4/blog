import * as React from "react";
import ThemeTopLayout from "gatsby-theme-material-ui-top-layout/src/components/top-layout";
import { Global } from "@emotion/core";
import { Theme } from "@material-ui/core";

import styles from "../../styles";
import SEO from "../../components/seo";

interface Props {
  children: React.ReactElement;
  theme: Theme;
}

const TopLayout: React.FC<Props> = ({ children, theme }: Props) => {
  return (
    <>
      <SEO />
      <Global styles={styles} />
      <ThemeTopLayout theme={theme}>{children}</ThemeTopLayout>
    </>
  );
};

export default TopLayout;
