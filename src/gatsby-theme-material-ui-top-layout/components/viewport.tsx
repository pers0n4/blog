import * as React from "react";

import { Helmet } from "react-helmet";

type Props = React.PropsWithChildren<unknown>;

export default function Viewport({ children }: Props) {
  return (
    <Helmet>
      <meta content="initial-scale=1, width=device-width" name="viewport" />
      {children}
    </Helmet>
  );
}
