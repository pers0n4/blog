import theme from "../gatsby-theme-material-ui-top-layout/theme";

export default {
  colors: {
    text: theme.palette.text.primary,
    background: theme.palette.background.default,
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
  },
  styles: {
    // p: {},
    // h2: {},
    // h3: {},
    // h4: {},
    // h5: {},
    // h6: {},
    blockquote: {
      marginLeft: "0",
      paddingLeft: "1.5rem",
      borderLeft: `0.25rem solid ${theme.palette.divider}`,
    },
    ul: {
      marginLeft: "1.5rem",
      paddingLeft: "0",
      "&.contains-task-list": {
        marginLeft: "0",
        listStyleType: "none",
      },
    },
    ol: {
      marginLeft: "1.5rem",
      paddingLeft: "0",
    },
    // li: {},
    // table: {},
    // thead: {},
    // tbody: {},
    // tr: {},
    // th: {},
    // td: {},
    // pre: {},
    code: {
      fontFamily: "monospace",
    },
    // em: {},
    // strong: {},
    // del: {},
    // hr: {},
    // a: {},
    // img: {},
  },
};
