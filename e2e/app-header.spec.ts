import { expect, test, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Auth is intentionally mocked by the application. Start from an isolated
  // demo session without depending on the unrelated login modal.
  await page.addInitScript(() => {
    localStorage.setItem('accessToken', 'dummy-jwt-token-mock-mode');
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: 'demo-user-123',
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@example.com',
        roles: ['admin'],
      })
    );
  });
});

async function expectHeaderToFit(page: Page) {
  const header = page.getByRole('banner');
  await expect(header).toHaveCSS('height', '64px');
  // Check rendered bounds, not just CSS declarations: an overflow:hidden mask
  // or nowrap alone would still leave links/actions clipped or overlapping.
  await expect
    .poll(() =>
      header.evaluate((element) => {
        const headerBox = element.getBoundingClientRect();
        const breadcrumb = element.querySelector('.ant-breadcrumb')!;
        const items = [...breadcrumb.querySelectorAll('li')];
        const children = [...element.children];
        const controls = [...element.querySelectorAll('button, a')];
        const inside = (node: Element) => {
          const box = node.getBoundingClientRect();
          return (
            box.width > 0 &&
            box.left >= headerBox.left - 1 &&
            box.right <= headerBox.right + 1 &&
            box.top >= headerBox.top &&
            box.bottom <= headerBox.bottom
          );
        };
        return {
          breadcrumbInside: inside(breadcrumb),
          singleRow: items.every(
            (item) =>
              Math.abs(
                item.getBoundingClientRect().top -
                  items[0].getBoundingClientRect().top
              ) < 1
          ),
          labelsFitItems: [
            ...breadcrumb.querySelectorAll('.ant-breadcrumb-link'),
          ].every((label) => {
            const box = label.getBoundingClientRect();
            const itemBox = label.parentElement!.getBoundingClientRect();
            // Antd links extend 4px either side for hover/focus padding.
            return (
              box.left >= itemBox.left - 4 && box.right <= itemBox.right + 4
            );
          }),
          controlsInside: controls.every(inside),
          usableButtons: [...element.querySelectorAll('button')].every(
            (button) => button.getBoundingClientRect().width >= 32
          ),
          noOverlap: children.every(
            (child, index) =>
              index === 0 ||
              child.getBoundingClientRect().left >=
                children[index - 1].getBoundingClientRect().right - 1
          ),
          noHeaderOverflow: element.scrollWidth <= element.clientWidth,
          noPageOverflow: document.documentElement.scrollWidth <= innerWidth,
        };
      })
    )
    .toEqual({
      breadcrumbInside: true,
      singleRow: true,
      labelsFitItems: true,
      controlsInside: true,
      usableButtons: true,
      noOverlap: true,
      noHeaderOverflow: true,
      noPageOverflow: true,
    });
}

test('contains the breadcrumb and all controls on short and long routes', async ({
  page,
}, testInfo) => {
  for (const path of ['/dashboards/default', '/user-profile/information']) {
    await page.goto(path);
    await expect(page.locator('header .ant-breadcrumb')).toBeVisible();
    await expectHeaderToFit(page);

    const current = page.locator('header [aria-current="page"]');
    await expect(current).toContainText(
      path.endsWith('information') ? 'Information' : 'Default'
    );
    const isTruncated = await current.evaluate(
      (element) => element.scrollWidth > element.clientWidth
    );
    expect(isTruncated).toBe(testInfo.project.use.viewport!.width === 375);
    await expect(current).toHaveCSS('text-overflow', 'ellipsis');
    await expect(current.locator('[title]')).toHaveAttribute(
      'title',
      path.endsWith('information') ? 'Information' : 'Default'
    );
  }
  await testInfo.attach('responsive-header', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
});

test('keeps sidebar toggle and breadcrumb links usable', async ({ page }) => {
  await page.goto('/user-profile/information');
  const toggle = page.getByRole('button', { name: /Sidebar/ });
  const wasExpanded = await toggle.getAttribute('aria-expanded');
  await toggle.click();
  await expect(toggle).toHaveAttribute(
    'aria-expanded',
    wasExpanded === 'true' ? 'false' : 'true'
  );
  await expectHeaderToFit(page);
  await toggle.click();
  await expectHeaderToFit(page);

  const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumb' });
  const ancestor = breadcrumb.getByRole('link', { name: 'User-profile' });
  await expect(ancestor).toHaveAttribute('href', '/user-profile');
  await ancestor.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/user-profile$/);
  await breadcrumb.getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page).toHaveURL('/');
});

test('opens search and navigates from the compact or desktop trigger', async ({
  page,
}) => {
  await page.goto('/dashboards/default');
  await page
    .getByRole('banner')
    .getByRole('button', { name: /Search/ })
    .click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('textbox').fill('Settings');
  await dialog.getByText('Settings', { exact: true }).click();
  await expect(page).toHaveURL('/user-profile/settings');
  await expect(dialog).not.toBeVisible();
  await expectHeaderToFit(page);

  await page.keyboard.press('Control+k');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
});

test('preserves secondary actions and profile navigation', async ({ page }) => {
  await page.goto('/dashboards/default');
  const more = page.getByRole('button', { name: 'More actions' });
  if (await more.count()) {
    await more.focus();
    await page.keyboard.press('Enter');
    await expect(more).toHaveAttribute('aria-expanded', 'true');
  }
  await expect(
    page.getByRole('button', { name: 'Apps', exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Messages', exact: true })
  ).toBeVisible();
  await page.getByRole('button', { name: 'Language', exact: true }).click();
  await page.getByRole('menuitem', { name: /Español/ }).click();
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('i18nextLng')))
    .toBe('es');
  await page.getByRole('button', { name: 'Changelog', exact: true }).click();
  await expect(page).toHaveURL('/releases');

  await page.goto('/dashboards/default');
  await page.getByRole('button', { name: 'Profile menu' }).focus();
  await page.keyboard.press('Enter');
  await page.getByRole('menuitem', { name: /settings/i }).click();
  await expect(page).toHaveURL('/user-profile/settings');
});

test('preserves 64px height, background, blur and shadow on content scroll', async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'persist:root',
      JSON.stringify({
        designStyle: JSON.stringify({ activeStyle: 'glassmorphic' }),
      })
    );
  });
  await page.goto('/user-profile/information');
  const header = page.getByRole('banner');
  const content = page.getByRole('main');
  await expect(header).toHaveCSS('box-shadow', 'none');
  await expect(header).toHaveCSS('backdrop-filter', 'none');
  await expect(header).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expectHeaderToFit(page);

  // The layout first mounts a skeleton during its entrance animation. Wait for
  // the real scrollable page before scrolling; the skeleton may not overflow.
  await expect(content.locator('.ant-skeleton')).toHaveCount(0);
  await expect
    .poll(() =>
      content.evaluate((element) => element.scrollHeight - element.clientHeight)
    )
    .toBeGreaterThan(150);
  await content.evaluate((element) => {
    element.scrollTop = 150;
  });
  await expect
    .poll(() => content.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(5);
  await expect(header).not.toHaveCSS('box-shadow', 'none');
  await expect(header).not.toHaveCSS('backdrop-filter', 'none');
  await expect(header).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expectHeaderToFit(page);

  await content.evaluate((element) => {
    element.scrollTop = 0;
  });
  await expect(header).toHaveCSS('box-shadow', 'none');
  await expect(header).toHaveCSS('backdrop-filter', 'none');
  await expect(header).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expectHeaderToFit(page);
});
