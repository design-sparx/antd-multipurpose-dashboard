---
'antd-multi-dashboard': patch
---

fix(antd): migrate deprecated v6 component props across Alert, Space, Drawer, Tag, Modal, Collapse, Divider, and Card components.

- Alert `message` → `title`; Alert `onClose` → `closable.onClose`
- Space `direction="vertical"` → `vertical`; `direction="horizontal"` removed (default)
- Drawer `width`/`height` → `size`
- Tag `bordered` → `variant` (`filled` / `outlined`)
- Modal `maskClosable` → `mask.closable`
- Collapse `expandIconPosition` → `expandIconPlacement`
- Divider `type` → `orientation`
- Card `bodyStyle` → `styles.body`

Also: replace static `message` API with `App.useApp()` (ConfigProvider context), add missing `alt` props to antd `Image` components, and replace deep `antd/es/masonry` default import with a named import from `antd`.
