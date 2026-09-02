# antd-multi-dashboard

## 2.0.1

### Patch Changes

- 6146a0e: ci(chromatic): replace exit-zero-on-errors with exitOnceUploaded

## 2.0.0

### Major Changes

- 902ebae: feat: upgrade to antd v6 with new UI components
- e5d8402: feat: comprehensive dashboard UI/UX upgrade

### Minor Changes

- ade9326: - feat(theme): add MUI, Shadcn, and Serene native antd theme styles
  - refactor(theme): render clean/bold/mui/shadcn/serene via antd ConfigProvider ThemeConfig (no CSS-in-JS); exempt glassmorphic/neumorphic which keep SurfaceTokens CSS rendering
  - feat(theme): scope sidebar menu colors per style via nested ConfigProvider (SIDEBAR_MENU)
- 576e007: Add `GuestFooter` to public layout — open-source project info, product links (Docs, Roadmap, Changelog), and community links (Source, Issues, Discussions) plus a "Star on GitHub" CTA and MIT license notice.
- 5f4f828: - feat(releases): add releases page and recent-releases component-
  - docs(agents): document theme-aware colors and app-shell provider refactor
  - fix(theme): make Logo use theme-aware brand primary instead of hardcoded blue
  - fix(theme): drive Button type=link color from brand primary for WCAG contrast
  - fix(theme): use brighter primary (#4d8bff) in dark mode for WCAG AA contrast
  - refactor(app): consolidate theme/design-style selectors; add PersistGate loading fallback
  - refactor(app): extract antd theme config and useDataTheme hook
  - refactor(app): hoist static StylesContext value, memoize antd theme config, tighten theme type
  - docs(agents): document Logo API, GuestFooter, FloatButton.Group pitfall
- eefd0d2: - feat(home): add BorderBeam theme-customization card with an onboarding tour across the style-switcher drawer (mode, design-style picker, fine-tune)
  - feat(style-switcher): add stable tour anchors (`data-tour`/class hooks) to mode, design-style picker, and customize sections
  - feat(layouts): open the style-switcher drawer from the home tour via window event

### Patch Changes

- e998680: chore: update Ant Design packages to v6.3.0
- 02ffdd6: ci: update workflows to Node 20 and pnpm
- 04bdf54: ci: declare single-package workspace in pnpm-workspace.yaml
- 42b31bd: chore(deps): bump follow-redirects from 1.15.11 to 1.16.0
- 150eaba: refactor(logo) + feat(footer): white-label logo props and public-site GuestFooter
  fix(announcements): call useAnnouncements unconditionally; trim home hero height
  refactor(logo): replace Typography.Title with Text, add white-label props
  feat(footer): add GuestFooter with project info and open-source links
  feat(guest): add dark/light toggle FloatButton.Group with BackTop
  fix(guest): stop theme toggle firing on FloatButton.Group open/close
  feat(footer): add Back to top button in GuestFooter meta row
  refactor(footer): swap Star on GitHub CTA from styled <a> to antd Button
- da1e9c7: ci: pin pnpm 9 and bump Node to 24 in release + chromatic workflows
- ccea43d: chore(deps): bump immutable from 5.1.4 to 5.1.5
- ae798ef: `Logo`: fix incorrect heading semantics, remove dead props (`imgSize.w`, `type="secondary"`, unused `FlexProps` spread), add `imgSrc`/`imgAlt`/`brandName`/`imgHeight` props for white-labeling, switch from `Typography.Title` to `Typography.Text` with `ellipsis`, default `href` to `/` instead of `#`.
- 26389a1: fix(antd): migrate deprecated v6 component props across Alert, Space, Drawer, Tag, Modal, Collapse, Divider, and Card components.

  - Alert `message` → `title`; Alert `onClose` → `closable.onClose`
  - Space `direction="vertical"` → `vertical`; `direction="horizontal"` removed (default)
  - Drawer `width`/`height` → `size`
  - Tag `bordered` → `variant` (`filled` / `outlined`)
  - Modal `maskClosable` → `mask.closable`
  - Collapse `expandIconPosition` → `expandIconPlacement`
  - Divider `type` → `orientation`
  - Card `bodyStyle` → `styles.body`

  Also: replace static `message` API with `App.useApp()` (ConfigProvider context), add missing `alt` props to antd `Image` components, and replace deep `antd/es/masonry` default import with a named import from `antd`.

- 5ef7b33: perf: removed unused css animations, improved code usage
- d9d4d5c: chore(deps): bump yaml from 2.8.2 to 2.8.3
- 324793d: fix(changeset): retarget stale changesets to antd-multi-dashboard
- a94767a: chore(guest): wrap public header content in shared Container and hide TanStack Query Devtools
- 7b3c036: chore(deps): bump lodash from 4.17.23 to 4.18.1
- ae36ee6: chore(deps): bump axios from 1.15.2 to 1.18.0
- dc5c098: docs: update README.md
- 9b0d73c: chore(deps): bump flatted from 3.3.3 to 3.4.2
- 729829e: chore(deps): bump protocol-buffers-schema from 3.6.0 to 3.6.1
- 8232264: refactor: standardize on TanStack Query — remove useFetchData
- c296494: feat: add PR template
- fbdc305: chore(deps): bump qs from 6.14.0 to 6.15.0
- e74713d: fix: type safety — consolidate endpoints, replace any types
- 2a55e03: chore(deps-dev): bump storybook from 8.6.14 to 8.6.17
- a08fa66: - fix(theme): add clean-style Layout tokens (light/dark) so sidebar and header use light/dark surfaces instead of antd's default dark navy, restoring readable menu text
- a6cccbd: chore(deps): bump lodash-es from 4.17.23 to 4.18.1
- 922245f: fix(antd): migrate deprecated v6 component props and message API

## 1.5.0

### Minor Changes

- 0e32a77: feat: added live and mock data modes

### Patch Changes

- e48de0c: chore(deps): bump lodash from 4.17.21 to 4.17.23
- 461f3ef: feat: updated theme support
  fix: resolved login fixes
  feat: update UI look in dark mode
- f5942b8: refactor: rename PascalCase files and directories to kebab-case
  chore: update pnpm-lock.yaml with dependency updates and version adjustments
  chore: streamline file imports and improve workflows
  chore: restrict GitHub workflow to trigger only on `main` branch
- b98956c: refactor: rename PascalCase files and directories to kebab-case

## 1.4.4

### Patch Changes

- d44ac06: chore(deps): bump tar-fs from 2.1.1 to 2.1.4
- b8f8222: chore(deps-dev): bump vite from 4.5.3 to 5.4.21
- f792207: chore(deps): bump min-document from 2.19.0 to 2.19.2

## 1.4.3

### Patch Changes

- 53ff25c: chore(deps): bump ws from 6.2.2 to 6.2.3
- d44ac06: chore(deps): bump tar-fs from 2.1.1 to 2.1.4
- c93a415: chore(deps): bump braces from 3.0.2 to 3.0.3
- 234ac92: styles: remove global `,` character
- ad15140: ### Added
  - feat(ui): added support for dark mode.
- 10564ae: chore(deps): bump fast-loops from 1.1.3 to 1.1.4

## 1.4.2

### Patch Changes

- 4a788cd: chore(deps): bump ejs from 3.1.9 to 3.1.10

## 1.4.1

### Patch Changes

- 6279a2a: chore(deps): bump tar from 6.2.0 to 6.2.1

## 1.4.0

### Minor Changes

- dbfcb7e: optimized imports, added project about page and made UI simple and minimal

### Patch Changes

- 0608bd2: ### Code optimization & bug fixes
  - chore: change onboarding flow. From landing → login → home
  - feat(ui): made general user interface simple and minimal
  - chore: cleaned up imports and refactors
  - chore(deps-dev): bump vite from 4.5.2 to 4.5.3
  - chore: refactored pages imports and exports
  - chore: refactored stories imports and exports
  - feat(page): added about project page
  - chore(docs): added CONTRIBUTING.md docs

## 1.3.7

### Patch Changes

- f61b0e2: chore: cleaned up imports and refactors
- 4c88ff7: chore: cleaned up imports and refactors

## 1.3.6

### Patch Changes

- 3e3e46a: chore(deps-dev): bump vite from 4.5.2 to 4.5.3

## 1.3.5

### Patch Changes

- ef6d616: feat(ui): made general user interface simple and minimal

## 1.3.4

### Patch Changes

- 8a5f6ef: chore: change onboarding flow. From landing → login → home

## 1.3.3

### Patch Changes

- c36ee47: Bump ip from 2.0.0 to 2.0.1

## 1.3.2

### Patch Changes

- a4f860c: Bump postcss from 8.4.29 to 8.4.33

## 1.3.1

### Patch Changes

- 4bc7545: docs: added product roadmap link to README.md
- 2bf40c3: Bump vite from 4.4.9 to 4.5.2
- 789f4f0: Bump vite from 4.4.9 to 4.5.2

## 1.3.0

### Minor Changes

- 882edb4: feat: updated landing page design

### Patch Changes

- 5819900: chore: removed react-calendar-timeline and history packages, marked as unused
- 58496dd: feat: added prettier, lint staged and husky
- b280442: feat: added prettier, lint-staged and husky
- 1c99e57: docs: updated readme
- be6253a: ### Added

  - ci: initialised basic js project, added commitlint and husky to lint commit messages
  - ci: added commit workflow
  - feat(github link): added github link to side navigation

  ### Updated

  - chore: removed react-calendar-timeline and history packages, marked as absolute
  - feat: updated landing page design
  - docs: updated readme
  - feat(github link): added github link to side navigation

## 1.3.1

### Patch Changes

- e73a01a: attempt fix to chromatic action

## 1.3.0

### Minor Changes

- 42371ab: updated font to use Lato, updated home page content, minor UI updates

## null

### Patch Changes

- a49261d: ### Updated
  - update github actions workflow files
- 527e6ac: added storybook, test badge statuses, updated changeset configs
- 327c38f: update github actions workflow files

## null

### Patch Changes

- 32ef4cd: ### Updated
  - added storybook, test badge statuses
- e980684: ### Added
  - added storybook, test badge statuses

## 1.2.0

### Minor Changes

- 3e88f3f: added storybook.js github action setup

### Patch Changes

- 9e8bb1d: # Added
  added storybook.js github action setup

## 1.0.1

### Patch Changes

- e8c3301: ### Added
  - added chromatic package to publish storybook
- d7591d9: added chromatic to publish storybook

## 1.0.0

### Major Changes

- db3184b: added storybook and setup custom component stories

### Patch Changes

- 5a1694a: ### Added
  - setup storybook.js
  - implemented component stories using storybook.js

## 0.7.5

### Patch Changes

- 453b63d: added netlify badge to README.md
- e21512f: ### Added
  - added netlify badge to README.md

## 0.7.4

### Patch Changes

- f9dab6b: ### Updated
  - updated README.md
- b981b9b: updated README.md

## 0.7.3

### Patch Changes

- 54b7ee8: added license, preview link, github stats badges
- fe6ce67: ### Added
  - added license, preview link, GitHub stats badges

## 0.7.2

### Patch Changes

- 7c4770b: ### Updated
  - updated README.md
- 55ad44c: updated README.md

## 0.7.1

### Patch Changes

- 039010e: ### Added

  - added user dropdown to app layout

  ### Updated

  - made landing page responsive

- 5bc6548: made landing page responsive, added user dropdown to app layout
- 862572f: ### Added

  - added dynamic path on page header
  - added path resolver to set active side bar link
  - added authentication pages

  ### Updated

  - ui changes to user profile pages

## 0.7.0

### Minor Changes

- 7814be6: added error result pages
- 5bac9b4: added authentication pages

### Patch Changes

- 31c1d95: - added dynamic path on page header
- dcf2f3e: ui changes to user profile pages
- f7b5198: - added path resolver to set active side bar link

## 0.6.1

### Patch Changes

- 1fe9b04: ### Added
  - added react-countup to add counter animation to dashboard statistics
- 3fe41d9: added react-countup to add counter animation to dashboard statistics

## 0.6.0

### Minor Changes

- 6d3b56b: - updated all dashboard designs - added fetch json data hooks with data, loading and error states - updated general theme configurations

### Patch Changes

- e616984: refined default dashboard page
- 437011c: ### Added

  - added fetch JSON data hooks with data, loading and error states

  ### Updated

  - updated all dashboard designs
  - updated general theme configurations

## 0.5.0

### Minor Changes

- 2f2f5b0: completed user profile pages and sections

### Patch Changes

- e18bbf4: ### Added

  - added user profile to sitemap
  - added active tab styles on the user profile page

  ### Updated

  - updated sitemap card styles
  - minor page-to-page transition update

## 0.4.3

### Patch Changes

- 314a528: added account security page
- 2201502: added account feedback page
- 2d5f55e: finished account activity page
- 18834e4: added user profile details page
- 3753458: added account actions page
- a1c18ac: ### Added the user profile pages
  - details
  - preferences
  - information
  - security
  - activity
  - actions
  - help
  - feedback
- 255f85f: added user profile personal information page
- efff0fb: added account help page
- 18834e4: added user account layout
- f5f27c8: added user profile preferences page

## 0.4.2

### Patch Changes

- e7d2fcf: ### Added:
  - finished corporate about page
  - finished corporate team page
  - finished corporate contact page
  - added redirects to fix reload error on netlify
  - added corporate pricing page
  - added corporate licence page
  - added sitemap page

## 0.4.1

### Patch Changes

- e82db0e: ### Update:
  - landing page update

## 0.4.0

### Minor Changes

- 740edc8: Added react helmet to manage document heads
- 740edc8: Added: - added react top progress bar - added sidebar collapse transitions

## 0.3.1

### Patch Changes

- bfd0aa0: ### Added:
  - react helmet to manage document heads

## 0.3.0

### Minor Changes

- d93a009: Added mobile responsiveness to both layouts and existing pages

## 0.2.3

### Patch Changes

- 701c579: ### Added:
  - added glassphormism effect to template

## 0.2.2

### Patch Changes

- 4a4a0f1: ## Updated
  - replaced npm commands with yaml to fix "The `npm ci` command can only install with an existing package-lock.json" error from the test github action

## 0.2.1

### Patch Changes

- f1e46f7: ## Updated
  - updated test.yml to use minimum node v16

## 0.2.0

### Minor Changes

- ed0f440: Added automation to changeset on every PR via github actions

### Patch Changes

- 8f9bd75: ## Added
  - Implemented test GitHub Actions to automate testing workflows.
  - Added CONTRIBUTING.md with helpful notes for contributors.
  - Added a changeset script in package.json to streamline versioning and changelog management.
- be68950: ## Updated
  - updated test.yml to use minimum node v16

## 0.1.0

### Minor Changes

- Added changesets to manage versioning and changelogs
