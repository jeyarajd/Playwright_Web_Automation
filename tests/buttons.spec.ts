import { test, expect } from '../fixtures/fixtures';

test.describe('Buttons & Actions', () => {
  test.beforeEach(async ({ buttonsPage }) => {
    await buttonsPage.goto();
  });

  test('disabled button cannot be clicked', async ({ buttonsPage }) => {
    await expect(buttonsPage.disabledBtn).toBeDisabled();
  });

  test('delayed button becomes enabled after a wait, not immediately', async ({ buttonsPage }) => {
    await expect(buttonsPage.delayedBtn).toBeDisabled();
    // Playwright auto-retries this assertion until it passes or the timeout expires —
    // that IS the wait. Never pair this with waitForTimeout.
    await expect(buttonsPage.delayedBtn).toBeEnabled({ timeout: 5000 });
  });

  test('click counter increments per click, including rapid clicks', async ({ buttonsPage }) => {
    await buttonsPage.clickCounterTimes(3);
    await expect(buttonsPage.counterValue).toHaveText('3');
  });

  test('right-click produces a different output than left-click', async ({ buttonsPage }) => {
    await buttonsPage.rightClick();
    const rightClickOutput = await buttonsPage.clickOutput.textContent();
    expect(rightClickOutput).toMatch(/right/i);
  });

  test('toggle button flips aria-pressed on each click', async ({ buttonsPage }) => {
    await expect(buttonsPage.toggleBtn).toHaveAttribute('aria-pressed', 'false');
    await buttonsPage.toggleBtn.click();
    await expect(buttonsPage.toggleBtn).toHaveAttribute('aria-pressed', 'true');
  });

  test('remove button is scoped per card — removing one leaves the others', async ({ buttonsPage }) => {
    const countBefore = await buttonsPage.cards.count();
    const firstCardText = (await buttonsPage.cards.first().textContent()) ?? '';
    await buttonsPage.removeCard(firstCardText.trim());
    await expect(buttonsPage.cards).toHaveCount(countBefore - 1);
  });
});
