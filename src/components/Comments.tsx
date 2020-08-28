import * as React from "react";
import { createRef, useLayoutEffect } from "react";

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

const Comments: React.FC<Props> = ({ repo, issue, theme }: Props) => {
  const container = createRef<HTMLElement>();
  const classes = useStyles();

  useLayoutEffect(() => {
    const utterances = document.createElement("script");

    utterances.src = "https://utteranc.es/client.js";
    utterances.crossOrigin = "anonymous";
    utterances.async = true;
    utterances.setAttribute("repo", repo);
    utterances.setAttribute("issue-term", issue);
    utterances.setAttribute("theme", theme);

    container?.current?.appendChild(utterances);
  }, [repo, issue, theme, container]);

  return <Paper component="section" ref={container} className={classes.root} />;
};

export default React.memo(Comments);
