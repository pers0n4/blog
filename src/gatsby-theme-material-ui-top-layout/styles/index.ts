import type { SerializedStyles } from "@emotion/core";
import type { Theme } from "@material-ui/core";

import global from "./global";
import prism from "./prism";

const styles = (theme: Theme): SerializedStyles | SerializedStyles[] => [
  global(theme),
  ...prism(theme),
];

export default styles;
