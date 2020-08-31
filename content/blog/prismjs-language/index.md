---
title: Prism.js Languages
date: 1970-01-02T01:00:00+09:00
---

```text
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
