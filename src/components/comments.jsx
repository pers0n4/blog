import React, { createRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";

const Comments = ({ repo, issue, theme }) => {
  const container = createRef();

  useLayoutEffect(() => {
    const utterances = document.createElement("script");

    utterances.src = "https://utteranc.es/client.js";
    utterances.crossOrigin = "anonymous";
    utterances.async = true;
    utterances.setAttribute("repo", repo);
    utterances.setAttribute("issue-term", issue);
    utterances.setAttribute("theme", theme);

    container.current.appendChild(utterances);
  }, [repo, issue, theme, container]);

  return <section ref={container} />;
};

Comments.propTypes = {
  repo: PropTypes.string.isRequired,
  issue: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};

export default React.memo(Comments);
