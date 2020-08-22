import * as React from "react";
import { createRef, useLayoutEffect } from "react";

interface Props {
  repo: string;
  issue: string;
  theme: string;
}

const Comments: React.FC<Props> = ({ repo, issue, theme }: Props) => {
  const container = createRef<HTMLElement>();

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

  return <section ref={container} />;
};

export default React.memo(Comments);
