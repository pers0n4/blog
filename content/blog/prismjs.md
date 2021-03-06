---
title: Prism.js
date: 2020-05-09T16:55:36+09:00
---

## Languages

```text
hello, world!
```

```txt
hello, world!
```

```json
{
  "name": "blog"
}
```

```shell{outputLines: 2}
echo hello, world!
hello, world!
```

```bash{outputLines: 2}{promptUser: user}{promptHost: localhost}
echo hello, world!
hello, world!
```

```markdown
# hello, world
```

```mdx
# hello, world
```

```html
<html>
  <head></head>
  <body>
    hello, world
  </body>
</html>
```

```css
body {
  margin: 0;
  font-family: "Noto Sans KR", sans-serif;
}
```

```javascript{numberLines: true}
const main = (str) => {
  console.log(str);
}

main("hello, world!"); // highlight-line
```

```typescript
const main = (str: string) => {
  console.log(str);
}

main("hello, world!"); // highlight-line
```

```jsx
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <h1>hello, world!</h1>,
  document.getElementById("root"),
);
```

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";

ReactDOM.render(
  <h1>hello, world!</h1>,
  document.getElementById("root"),
);
```

```python:title=script.py
def main(string):
  print(string)

if __name__ == "__main__":
  main("hello, world!")
```

## Line numbering

To see the line numbers alongside your code, you can use the `numberLines` option:

````text
```javascript{numberLines: true}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`,
      ]
    }
  }
]
```
````

```javascript{numberLines: true}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [`gatsby-remark-prismjs`],
    },
  },
];
```

You can also start numbering at any index you wish (here, numbering
will start at index 5):

````text
```javascript{numberLines: 5}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`,
      ]
    }
  }
]
```
````

```javascript{numberLines: 5}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [`gatsby-remark-prismjs`],
    },
  },
];
```

## Line highlighting

You can also add line highlighting. It adds a span around lines of code with a
special class `.gatsby-highlight-code-line` that you can target with styles. See
this README for more info.

To highlight lines, you can use one of the following directives as comments in your
code:

- `n> highlight-line` highlights the current line;
- `n> highlight-next-line` highlights the next line;
- `n> highlight-start` highlights the lines until the matching `n> hightlight-end`;
- `n> highlight-range{1, 4-6}` will highlight the next line, and the fourth, fifth and sixth lines.

````text
```jsx
class FlavorForm extends React.Component { // highlight-line
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // highlight-next-line
    this.setState({value: event.target.value});
  }

  // highlight-start
  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }
  // highlight-end

  render() {
    return (
      { /* highlight-range{1,4-9,12} */ }
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
````

```jsx
class FlavorForm extends React.Component { // highlight-line
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // highlight-next-line
    this.setState({value: event.target.value});
  }

  // highlight-start
  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }
  // highlight-end

  render() {
    return (
      { /* highlight-range{1,4-9,12} */ }
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

You can also specify the highlighted lines outside of the code block.
In the following code snippet, lines 1 and 4 through 6 will get the line
highlighting. The line range parsing is done with
<https://www.npmjs.com/package/parse-numeric-range>.

````text
```javascript{1,4-6}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`,
      ]
    }
  }
]
```
````

```javascript{1,4-6}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [`gatsby-remark-prismjs`],
    },
  },
];
```

## Shell prompt

To show fancy prompts next to shell commands (only triggers on `bash`), either set `prompt.global` to `true` in `gatsby-config.js`,
or pass at least one of `{outputLines: <range>}`, `{promptUser: <user>}`, or `{promptHost: <host>}` to a snippet

By default, every line gets a prompt appended to the start, this behaviour can be changed by specifying `{outputLines: <range>}`
to the language.

````text
```bash{outputLines: 2-10,12}
````

The user and host used in the appended prompt is pulled from the `prompt.user` and `prompt.host` values,
unless explicitly overridden by the `promptUser` and `promptHost` options in the snippet, e.g.:

````text
```bash{promptUser: alice}{promptHost: dev.localhost}
````

## Code title

````text
```js:title=example.js {numberLines: true}
console.log("hello world");
```
````

```js:title=example.js {numberLines: true}
console.log("hello world");
```
