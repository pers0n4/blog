import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import type { Theme } from "@material-ui/core";

const config = {
  margin: {
    y: "1.5rem",
  },
  padding: {
    x: "1em",
    y: "1.5rem",
  },
};

const override = (theme: Theme): SerializedStyles => css`
  :not(pre) > code[class*="language-"] {
    border-radius: ${theme.shape.borderRadius}px;
    padding: 0.1em 0.2em;
    white-space: normal;
  }

  code[class*="language-"],
  pre[class*="language-"] {
    font-family: "Fira Code", monospace;
    font-size: 0.875rem;
  }
`;

const gatsbyHighlight = (theme: Theme): SerializedStyles => css`
  /**
   * Add back the container background-color, border-radius, padding, margin
   * and overflow that we removed from <pre>.
   */
  .gatsby-highlight {
    background-color: #2f2f2f;
    border-radius: ${theme.shape.borderRadius}px;
    margin: ${config.margin.y} 0;
    overflow: auto;
    padding: ${config.padding.y} ${config.padding.x};
  }

  /**
   * Remove the default PrismJS theme background-color, border-radius, margin,
   * padding and overflow.
   * 1. Make the element just wide enough to fit its content.
   * 2. Always fill the visible space in .gatsby-highlight.
   * 3. Adjust the position of the line numbers
   */
  .gatsby-highlight pre[class*="language-"] {
    background-color: transparent;
    float: left; /* 1 */
    margin: 0;
    min-width: 100%; /* 2 */
    overflow: initial;
    padding: 0;
  }
`;

const lineHighlight = (theme: Theme): SerializedStyles => css`
  .gatsby-highlight-code-line {
    background-color: ${theme.palette.grey[900]};
    display: block;
    margin-left: -${config.padding.x};
    margin-right: -${config.padding.x};
    padding-left: ${config.padding.x};
    padding-right: ${config.padding.x};
  }
`;

const lineNumbers = css`
  /**
   * If you already use line highlighting
   */

  /* Adjust the position of the line numbers */
  .gatsby-highlight pre[class*="language-"].line-numbers {
    padding-left: 2.8em;

    /* Override */
    .gatsby-highlight-code-line {
      margin-left: calc((2.8em + ${config.padding.x}) * -1);
      padding-left: calc(2.8em + ${config.padding.x});
    }
  }

  /**
   * If you only want to use line numbering
   */

  /* .gatsby-highlight {
    background-color: #fdf6e3;
    border-radius: 0.3em;
    margin: 0.5em 0;
    overflow: auto;
    padding: 1em;
  }

  .gatsby-highlight pre[class*="language-"].line-numbers {
    overflow: initial;
    padding-left: 2.8em;
    padding: 0;
  } */
`;

/* https://www.gatsbyjs.org/packages/gatsby-remark-code-titles/ */
const codeTitle = (theme: Theme): SerializedStyles => css`
  .gatsby-code-title {
    background-color: ${theme.palette.secondary.main};
    border-top-left-radius: ${theme.shape.borderRadius}px;
    border-top-right-radius: ${theme.shape.borderRadius}px;
    color: ${theme.palette.secondary.contrastText};
    font-family: "Fira Code", monospace;
    margin-bottom: -${config.margin.y};
    margin-top: ${config.margin.y};
    padding: 0.5em 1em;
  }

  .gatsby-code-title + .gatsby-highlight {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

/* https://prismjs.com/#supported-languages */
const languageHighlight = (theme: Theme): SerializedStyles => css`
  .gatsby-highlight {
    pre[class*="language-"]::before {
      border-radius: 0 0 ${theme.shape.borderRadius}px
        ${theme.shape.borderRadius}px;
      font-size: 0.75rem;
      left: 0;
      letter-spacing: 0.075em;
      line-height: 1;
      padding: 0.25em 0.5em;
      position: absolute;
      text-align: right;
      text-transform: uppercase;
      top: -${config.padding.y};
    }

    pre[class~="language-text"]::before,
    pre[class~="language-txt"]::before {
      content: "text";
      background-color: ${theme.palette.grey[50]};
      color: ${theme.palette.getContrastText(theme.palette.grey[50])};
    }

    pre[class~="language-json"]::before {
      content: "json";
      background-color: ${theme.palette.grey[900]};
      color: ${theme.palette.getContrastText(theme.palette.grey[900])};
    }

    pre[class~="language-shell"]::before,
    pre[class~="language-sh"]::before {
      content: "shell";
      background-color: ${theme.palette.grey[900]};
      color: ${theme.palette.getContrastText(theme.palette.grey[900])};
    }

    pre[class~="language-bash"]::before {
      content: "bash";
      background-color: ${theme.palette.grey[900]};
      color: ${theme.palette.getContrastText(theme.palette.grey[900])};
    }

    /* https://daringfireball.net/projects/markdown/ */
    pre[class~="language-markdown"]::before,
    pre[class~="language-md"]::before {
      content: "md";
      background-color: #4a525a;
      color: ${theme.palette.getContrastText("#4a525a")};
    }

    /* https://mdxjs.com/ */
    pre[class~="language-mdx"]::before {
      content: "mdx";
      background-color: #fcb42d;
      color: ${theme.palette.getContrastText("#fcb42d")};
    }

    /* https://www.w3.org/html/logo/ */
    pre[class~="language-html"]::before {
      content: "html";
      background: linear-gradient(to right, #e44d26, #f16529);
      color: ${theme.palette.getContrastText("#e44d26")};
    }

    /* https://en.wikipedia.org/wiki/Cascading_Style_Sheets */
    pre[class~="language-css"]::before {
      content: "css";
      background: linear-gradient(to right, #264de4, #2965f1);
      color: ${theme.palette.getContrastText("#264de4")};
    }

    /* https://en.wikipedia.org/wiki/JavaScript */
    pre[class~="language-javascript"]::before,
    pre[class~="language-js"]::before {
      content: "js";
      background-color: #f7e018;
      color: ${theme.palette.getContrastText("#f7e018")};
    }

    /* https://www.typescriptlang.org/branding/ */
    pre[class~="language-typescript"]::before,
    pre[class~="language-ts"]::before {
      content: "ts";
      background-color: #3178c6;
      color: ${theme.palette.getContrastText("#3178c6")};
    }

    /* https://reactjs.org/ */
    pre[class~="language-jsx"]::before {
      content: "jsx";
      background-color: #61dafb;
      color: ${theme.palette.getContrastText("#61dafb")};
    }

    pre[class~="language-tsx"]::before {
      content: "tsx";
      background-color: #3178c6;
      color: ${theme.palette.getContrastText("#3178c6")};
    }

    /* https://www.python.org/community/logos/ */
    pre[class~="language-python"]::before,
    pre[class~="language-py"]::before {
      content: "py";
      background: linear-gradient(120deg, #366a96, #3679b0, #ffc836, #ffe873);
      color: ${theme.palette.getContrastText("#366a96")};
    }
  }
`;

const prismStyles = (theme: Theme): SerializedStyles[] => [
  gatsbyHighlight(theme),
  lineHighlight(theme),
  lineNumbers,
  codeTitle(theme),
  languageHighlight(theme),
  override(theme),
];

export default prismStyles;
