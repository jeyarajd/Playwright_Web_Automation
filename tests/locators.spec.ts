import { test, expect } from '../fixtures/fixtures';

test.describe('Tricky Locators', () => {
  test.beforeEach(async ({ locatorsPage }) => {
    await locatorsPage.goto();
  });

  test('duplicate id is resolved via data-testid, not #id', async ({ locatorsPage }) => {
    // page.locator('#dup-id') would match 2 elements and throw a strict-mode violation.
    await expect(locatorsPage.dupIdFirst).toContainText('First element');
    await expect(locatorsPage.dupIdSecond).toContainText('Second element');
  });

  test('View button is scoped per row — clicking one never affects another row', async ({ locatorsPage }) => {
    await locatorsPage.viewRow('#1043');
    await expect(locatorsPage.viewOutput).toContainText('1043');
  });

  test('hidden element reports not visible', async ({ locatorsPage }) => {
    await expect(locatorsPage.twinHidden).toBeHidden();
  });

  test('offscreen element is technically "visible" per Playwright, despite being off-canvas', async ({ locatorsPage }) => {
    // Counter-intuitive but correct: isVisible() only checks size + hidden CSS, not screen position.
    await expect(locatorsPage.twinOffscreen).toBeVisible();
    const box = await locatorsPage.twinOffscreen.boundingBox();
    // The real on-screen position check has to be done separately, e.g. via boundingBox().x.
    expect(box && box.x).toBeLessThan(0);
  });

  test('id/class regenerate every ~2s — data-testid stays the stable anchor', async ({ locatorsPage }) => {
    const idBefore = await locatorsPage.currentIdText.textContent();
    await expect
      .poll(async () => locatorsPage.currentIdText.textContent(), { timeout: 4000 })
      .not.toBe(idBefore);
  });

  test('Playwright pierces the Shadow DOM automatically', async ({ locatorsPage }) => {
    await locatorsPage.shadowButton().click();
    await expect(locatorsPage.shadowOutput).not.toBeEmpty();
  });
});
