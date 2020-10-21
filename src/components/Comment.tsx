import * as React from "react";
import { useLayoutEffect, useRef } from "react";

import { makeStyles, useTheme } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    marginTop: "1.5rem",
    padding: "1rem",
    "& .utterances": {
      maxWidth: "none",
    },
  },
});

const Comment: React.FC = () => {
  const containerRef = useRef<HTMLElement>();
  const classes = useStyles();
  const theme = useTheme().palette.type;

  useLayoutEffect(() => {
    const container = containerRef.current;
    const utterances = document.createElement("script");

    const config = {
      src: "https://utteranc.es/client.js",
      repo: "pers0n4/blog",
      "issue-term": "pathname",
      theme: theme === "light" ? "github-light" : "github-dark",
      crossorigin: "anonymous",
      aync: "true",
    };

    Object.entries(config).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    container?.appendChild(utterances);

    return () => {
      if (container?.firstChild) container?.removeChild(container.firstChild);
    };
  }, [theme]);

  return (
    <Paper component="section" ref={containerRef} className={classes.root} />
  );
};

export default React.memo(Comment);
