![behance](https://github.com/design-sparx/antd-multipurpose-dashboard/assets/26582923/cc9c94ee-488f-4ae5-bb17-bbfe230e8524)

<p align="center">
<img src="public/logo-no-background.png" alt="logo" height="100"/>
</p>

<p align="center">
  <a href="https://github.com/design-sparx/antd-mutli-dashboard/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  </a>
  <a href="https://github.com/design-sparx/antd-mutli-dashboard/issues?q=is%3Aopen+is%3Aissue">
    <img src="https://img.shields.io/github/issues/design-sparx/antd-multipurpose-dashboard/open.svg" alt="GitHub issues open">
  </a>
  <a href="https://github.com/design-sparx/antd-mutli-dashboard/issues?q=is%3Aissue+is%3Aclosed">
    <img src="https://img.shields.io/github/issues-closed-raw/design-sparx/antd-multipurpose-dashboard" alt="GitHub issues closed">
  </a>
  <a href="https://antd-multipurpose-dashboard.netlify.app/" rel="nofollow">
    <img src="https://img.shields.io/badge/demo-online-green.svg" alt="Live Demo"></a>
  <a href="https://github.com/design-sparx/antd-multipurpose-dashboard/archive/refs/heads/ft/readme.zip">
    <img src="https://img.shields.io/static/v1?label=download&message=ZIP&color=green" alt="Download">
  </a>
  <a href="https://app.netlify.com/sites/antd-multipurpose-dashboard/deploys">
    <img src="https://api.netlify.com/api/v1/badges/453b19f9-2043-402d-a715-41d55db6447a/deploy-status" alt="Netlify Deployment Status">
  </a> 
  <a href="https://github.com/design-sparx/antd-multipurpose-dashboard/actions/workflows/chromatic.yml">
    <img src="https://github.com/design-sparx/antd-multipurpose-dashboard/actions/workflows/chromatic.yml/badge.svg" alt="Storybook Deployment Status">
  </a> 
  <br>
  <a href="https://github.com/design-sparx/antd-mutli-dashboard">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/design-sparx/antd-multipurpose-dashboard?style=social">
  </a>
</p>

- [Live preview](https://antd-multipurpose-dashboard.netlify.app/)
- [Components preview](https://6546507b657a74164abf2db6-iqmnggdrcl.chromatic.com/)
- [Medium](https://medium.com/@kelvink96/designing-modern-dashboards-a-journey-through-react-vite-ant-design-and-storybook-2dac23e1e49a)
- [Product roadmap](https://kelvink96.notion.site/Antd-multipurpose-dashboard-Product-roadmap-92163e05b8ea444a8f87b7f834933069) _ **New** _

## Introduction

A professional Admin & Dashboard template based on [Ant design 5](https://ant.design/) that comes with hundreds of UI
components, forms, tables, charts, pages and icons. This template is built using [React](https://react.dev/),
[Vite](https://vitejs.dev/), [Ant Design Charts](https://charts.ant.design/),
[Ant Design Icons](https://ant.design/components/icon) and [Storybook](https://storybook.js.org/).

## Features

- **Customizable:** You don't need to be an expert to customize the template. Our code is very readable and
  well-documented.
- **Fully Responsive:** With mobile, tablet & desktop support it doesn't matter what device you're using. Antd Dashboard
  is responsive in all browsers.
- **Cross-Browser:** Our themes are working perfectly with Chrome, Firefox, Opera, and Edge. We're working hard to
  support them.
- **Clean Code:** We strictly follow Ant Design's guidelines to make your integration as easy as possible. All code is
  handwritten.
- **Regular Updates:** From time to time you'll receive an update containing new components, improvements, and bug
  fixes.

## Tech stack

This project features all the latest tools and good practices in web development!

### Framework

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling

#### Design System and Animations

- [Ant design](https://ant.design/) - An enterprise-class UI design language and React UI library provides high-quality
  components.
- [Ant design icons](https://ant.design/components/icon/) - Semantic vector graphics.

#### Charts

- [Ant design charts](https://charts.ant.design/)

<details>
<summary>View more stacks</summary>

#### Routing

- [React router](https://reactrouter.com/en/main)

#### Design Patterns

- [ESLint](https://eslint.org/)
- [Husky](https://github.com/typicode/husky)
- [Lint staged](https://github.com/lint-staged/lint-staged)
- [Prettier](https://prettier.io/)

#### Components docs

- [Storybook](https://storybook.js.org/)

#### Date formatting

- [moment](https://momentjs.com/)
- [dayjs](https://day.js.org/)

#### Utils

- [lodash](https://lodash.com/)
- [react-countup](https://github.com/glennreyes/react-countup)

</details>

## Quick start

#### Download

- Clone this repo git clone `https://github.com/design-sparx/antd-multipurpose-dashboard.git`
- [Download from GitHub](https://github.com/design-sparx/antd-multipurpose-dashboard/archive/refs/heads/main.zip)

### Build tools

You'll need to install Node.js.
Once Node.js is installed, run npm install to install the rest of the template's dependencies. All dependencies will be
downloaded to the node_modules directory.

<details>
<summary>View commands</summary>
```bash copy
npm install
```

Now you're ready to modify the source files and generate new files. To automatically detect file changes and start a
local webserver at http://localhost:3000, run the following command.

```bash copy
npm run dev
```

Compile, optimize, minify and uglify all source files to build/

```bash copy
npm run build
```

</details>

# File structure

Inside the zip file you'll find the following directories and files. Both compiled and minified distribution files, as
Inside the zip file, you'll find the following directories and files. Both compiled and minified distribution files and
the source files are included in the package.

<details>
<summary>View file tree</summary>

```files
📂 antd-multi-dashboard/
┣ 📂 .github/                   # GitHub's folder configs **
┣ 📂 .husky/                    # Husky's folder
┃ ┣ 📃 commit-msg               # Commitlint git hook
┃ ┗ 📃 pre-commit               # Lint-staged git hook
┣ 📂 .vscode/                   # VSCode's workspace **
┣ 📂 .idea/                     # Intellij's webstorm workspace **
┣ 📂 .storybook/                # Storybook folder config **
┣ 📂 public/                    # Public folder
┃ ┣ 📂 mocks/                   # Mock data folder **
┃ ┣ 📂 showcase/                # Showcase images folder **
┃ ┣ 📃 favicon.ico              # Icon tab browser
┣ 📂 src/
┃ ┣ 📂 assets/                  # Assets folder **
┃ ┣ 📂 components/              # App Components **
┃ ┣ 📂 constants/               # App Components **
┃ ┃ ┗ 📃 routes.ts              # All routes declarations **
┃ ┣ 📂 context/                 # React state conexts **
┃ ┣ 📂 hooks/                   # React Hooks **
┃ ┃ ┗ 📃 useFetch.ts            # Data fetch hook (optional) **
┃ ┣ 📂 layouts/                 # Page layouts folder **
┃ ┣ 📂 pages/                   # Pages **
┃ ┣ 📂 routes/                  # Routes config folder **
┃ ┣ 📂 stories/                 # Storybook folder **
┃ ┣ 📂 types/                   # Typescript types/interfaces **
┃ ┣ 📂 utils/                   # Useful functions folder **
┣ 📃 .editorconfig              # Editor config
┣ 📃 .eslintrc                  # ESLint config
┣ 📃 .gitignore                 # Git ignore
┣ 📃 .prettierignore            # Prettier ignore
┣ 📃 .prettierrc                # Prettier ignore
┣ 📃 .versionrc                 # Versioning config
┣ 📃 .commitlintrc              # Commitlint config
┣ 📃 CHANGELOG.md               # Changelogs
┣ 📃 CONTRIBUTING.md            # Contributing
┣ 📃 LICENSE                    # License of the project
┣ 📃 vite.config.js             # Vite config
┣ 📃 README.md                  # Main README
┣ 📃 renovate.json              # Renovate Bot config **
┣ 📃 tsconfig.json              # TypeScript config
```

</details>
