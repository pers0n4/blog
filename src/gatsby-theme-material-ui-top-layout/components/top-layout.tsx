import * as React from "react";
import { Theme } from "@material-ui/core";
import ThemeTopLayout from "gatsby-theme-material-ui-top-layout/src/components/top-layout";

import SEO from "../../components/seo";

interface Props {
  children: React.ReactElement;
  theme: Theme;
}

const TopLayout: React.FC<Props> = ({ children, theme }: Props) => {
  return (
    <>
      <SEO />
      <ThemeTopLayout theme={theme}>{children}</ThemeTopLayout>
    </>
  );
};

export default TopLayout;
