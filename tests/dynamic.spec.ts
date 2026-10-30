import { test, expect } from '../fixtures/fixtures';

test.describe('Dynamic Content', () => {
  test.beforeEach(async ({ dynamicPage }) => {
    await dynamicPage.goto();
  });

  test('delayed render appears only after the wait, never immediately', async ({ dynamicPage }) => {
    // Do NOT assert visibility right after goto() — it isn't there yet.
    await expect(dynamicPage.delayedRenderText).toBeVisible({ timeout: 4000 });
  });

  test('poll counter increases over time on its own', async ({ dynamicPage }) => {
    const first = await dynamicPage.pollCounter.textContent();
    await expect(dynamicPage.pollCounter).not.toHaveText(first ?? '', { timeout: 5000 });
  });

  test('overlay blocks the click until it is removed', async ({ dynamicPage, page }) => {
    // While the overlay is present, actionability should prevent a real click from landing.
    await expect(dynamicPage.overlayLoading).toBeVisible();
    // Once the overlay disappears, the same button becomes safely clickable.
    await expect(dynamicPage.overlayLoading).toBeHidden({ timeout: 4000 });
    await dynamicPage.coveredBtn.click();
  });

  test('progress bar reaches completion', async ({ dynamicPage }) => {
    await dynamicPage.startProgress();
    await expect(dynamicPage.progressLabel).toHaveText(/done/i, { timeout: 6000 });
  });

  test('moving target is eventually clickable once it settles', async ({ dynamicPage }) => {
    await dynamicPage.revealMovingTarget();
    // Playwright waits for the element to stop moving (stable) before clicking.
    await dynamicPage.movingTargetBtn.click({ timeout: 6000 });
  });

  test('infinite scroll loads more rows as the box is scrolled', async ({ dynamicPage }) => {
    const before = await dynamicPage.infiniteScrollRows().count();
    await dynamicPage.scrollInfiniteListToBottom();
    await expect
      .poll(async () => dynamicPage.infiniteScrollRows().count(), { timeout: 3000 })
      .toBeGreaterThan(before);
  });
});
