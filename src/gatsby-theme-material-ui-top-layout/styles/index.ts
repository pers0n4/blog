import type { Theme } from "@material-ui/core";

import global from "./global";
import prism from "./prism";

import type { SerializedStyles } from "@emotion/react";

const styles = (theme: Theme): SerializedStyles | SerializedStyles[] => [
  global(theme),
  ...prism(theme),
];

export default styles;
