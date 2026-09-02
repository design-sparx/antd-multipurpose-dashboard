---
"antd-multi-dashboard": patch
---

refactor(logo) + feat(footer): white-label logo props and public-site GuestFooter
fix(announcements): call useAnnouncements unconditionally; trim home hero height
refactor(logo): replace Typography.Title with Text, add white-label props
feat(footer): add GuestFooter with project info and open-source links
feat(guest): add dark/light toggle FloatButton.Group with BackTop
fix(guest): stop theme toggle firing on FloatButton.Group open/close
feat(footer): add Back to top button in GuestFooter meta row
refactor(footer): swap Star on GitHub CTA from styled <a> to antd Button
