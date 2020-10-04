import * as React from "react";
import { useLayoutEffect, useRef } from "react";

import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

interface Props {
  repo: string;
  issue: string;
  theme: string;
}

const useStyles = makeStyles({
  root: {
    marginTop: "1.5rem",
    padding: "1rem",
    "& .utterances": {
      maxWidth: "none",
    },
  },
});

const Comment: React.FC<Props> = ({ repo, issue, theme }: Props) => {
  const containerRef = useRef<HTMLElement>();
  const classes = useStyles();

  useLayoutEffect(() => {
    const container = containerRef.current;
    const utterances = document.createElement("script");

    const config = {
      src: "https://utteranc.es/client.js",
      repo,
      "issue-term": issue,
      theme,
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
  }, [repo, issue, theme]);

  return (
    <Paper component="section" ref={containerRef} className={classes.root} />
  );
};

export default React.memo(Comment);
