# Blog

[![Netlify Status](https://api.netlify.com/api/v1/badges/6519e5b9-d178-4824-9851-566f453e9407/deploy-status)](https://app.netlify.com/sites/pers0n4/deploys)
[![TypeScript]](https://www.typescriptlang.org/)
[![Gatsby]](https://www.gatsbyjs.com/)
[![React]](https://reactjs.org/)
[![GraphQL]](https://graphql.org/)

[typescript]: https://img.shields.io/static/v1?style=flat-square&labelColor=eeeeee&color=3178c6&logoColor=3178c6&label=&message=TypeScript&logo=typescript&#3178c6
[gatsby]: https://img.shields.io/static/v1?style=flat-square&labelColor=eeeeee&color=663399&logoColor=663399&label=&message=Gatsby&logo=gatsby&#663399
[react]: https://img.shields.io/static/v1?style=flat-square&labelColor=212121&color=61dafb&logoColor=61dafb&label=&message=React&logo=react&#61dafe
[graphql]: https://img.shields.io/static/v1?style=flat-square&labelColor=212121&color=e43aaa&logoColor=e43aaa&label=&message=GraphQL&logo=graphql&#e43aaa

<details open>
  <summary>Table of Contents</summary>

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Project Structure](#project-structure)
- [Workflow](#workflow)
  - [Branches](#branches)
  - [Commit Convention](#commit-convention)
  - [Versioning](#versioning)
- [License](#license)

</details>

---

## Getting Started

### Installation

```bash
# Install dependencies
yarn

#  Run development server
yarn start
```

### Project Structure

```bash
+-- content/
+-- src/
|   +-- components/
|   +-- pages/
|   +-- templates/
+-- static/
+-- gatsby-browser.js
+-- gatsby-config.js
+-- gatsby-node.js
```

## Workflow

### Branches

- `main`: 최신 안정화 버전
- `develop`: 새로운 기능 개발, 기능 개선을 위한 branch
- `production`: Netlify 배포를 위한 branch

### Commit Convention

[Conventional Commits](https://conventionalcommits.org/)및 [Angular Commit Message Format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format)을 따릅니다.

### Versioning

```bash
yarn release
yarn release -r <major|minor|patch>
```

## License

[![License](https://img.shields.io/github/license/pers0n4/blog?style=for-the-badge)](https://opensource.org/licenses/MIT)
