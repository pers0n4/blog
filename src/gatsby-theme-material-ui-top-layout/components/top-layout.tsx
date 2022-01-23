import * as React from "react";

import ColorModeProvider from "./context";
import Viewport from "./viewport";

type Props = React.PropsWithChildren<undefined>;

export default function TopLayout({ children }: Props) {
  return (
    <>
      <Viewport />
      <ColorModeProvider>{children}</ColorModeProvider>
    </>
  );
}
