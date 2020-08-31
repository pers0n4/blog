import { css, SerializedStyles } from "@emotion/core";
import { Theme } from "@material-ui/core";

const styles = (theme: Theme): SerializedStyles => css`
  ol,
  ul {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    margin-left: 1.5rem;
    padding-left: 0;
  }

  blockquote {
    border-left: 0.25rem solid ${theme.palette.divider};
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: 0;
    padding-left: 1.5rem;
    color: ${theme.palette.text.secondary};
  }

  sub,
  sup {
    font-size: 0.75rem;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  .contains-task-list {
    list-style-type: none;
    margin-left: 0;
  }

  .gatsby-resp-image-figcaption {
    color: ${theme.palette.text.hint};
    text-align: center;
  }
`;

export default styles;
