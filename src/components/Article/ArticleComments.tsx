import * as React from "react";
import { useLayoutEffect, useRef } from "react";

import { useTheme } from "@material-ui/core";

const ArticleComments: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme().palette.type;

  useLayoutEffect(() => {
    const container = containerRef.current;
    const utterances = document.createElement("script");

    const config = {
      aync: "true",
      crossorigin: "anonymous",
      "issue-term": "pathname",
      repo: "pers0n4/blog",
      src: "https://utteranc.es/client.js",
      theme: theme === "light" ? "github-light" : "github-dark",
    };

    Object.entries(config).map(([key, value]) =>
      utterances.setAttribute(key, value)
    );

    if (container) {
      container.append(utterances);
    }

    return () => {
      if (container && container.firstChild) {
        container.firstChild.remove();
      }
    };
  }, [theme]);

  return <div ref={containerRef} />;
};

export default React.memo(ArticleComments);
