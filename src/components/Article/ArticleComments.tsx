import * as React from 'react';
import { useLayoutEffect, useRef } from 'react';

import { useTheme } from '@material-ui/core';

const ArticleComments: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme().palette.type;

  useLayoutEffect(() => {
    const container = containerRef.current;
    const utterances = document.createElement('script');

    const config = {
      src: 'https://utteranc.es/client.js',
      repo: 'pers0n4/blog',
      'issue-term': 'pathname',
      theme: theme === 'light' ? 'github-light' : 'github-dark',
      crossorigin: 'anonymous',
      aync: 'true',
    };

    Object.entries(config).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    container?.appendChild(utterances);

    return () => {
      if (container?.firstChild) container?.removeChild(container.firstChild);
    };
  }, [theme]);

  return <div ref={containerRef} />;
};

export default React.memo(ArticleComments);
