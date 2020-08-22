// declare module "gatsby-theme-material-ui-top-layout";

// declare module "gatsby-theme-material-ui-top-layout/src/components/top-layout";
declare module "gatsby-theme-material-ui-top-layout/src/components/top-layout" {
  import * as React from "react";
  import { Theme } from "@material-ui/core/styles/createMuiTheme";

  interface Props {
    children: React.ReactElement;
    theme: Theme;
  }

  declare function TopLayout({ children, theme }: Props): JSX.Element;

  export default TopLayout;
}
