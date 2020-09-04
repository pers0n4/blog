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
    position: relative;
    vertical-align: baseline;
    font-size: 0.75rem;
    line-height: 0;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  .contains-task-list {
    margin-left: 0;
    list-style-type: none;
  }

  .gatsby-resp-image-figcaption {
    margin-top: 0.2rem;
    color: ${theme.palette.text.hint};
    text-align: center;
  }

  .footnote-ref,
  .footnote-backref {
    padding-left: 0.1em;
    font-family: Roboto, "Noto Sans KR", sans-serif;
  }

  @font-face {
    font-family: "Noto Color Emoji";
    src: local("Noto Color Emoji"),
      url("/fonts/NotoColorEmoji.ttf") format("truetype");
  }

  @font-face {
    font-family: "Noto Emoji";
    src: local("Noto Emoji"),
      url("/fonts/NotoEmoji-Regular.ttf") format("truetype");
  }

  @font-face {
    font-family: "Twemoji Mozilla";
    src: local("Twemoji Mozilla"),
      url("/fonts/TwemojiMozilla.ttf") format("truetype");
  }
`;

export default styles;
