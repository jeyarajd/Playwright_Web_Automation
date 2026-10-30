import { test, expect } from '../fixtures/fixtures';

test.describe('My Test', () => {
  test.beforeEach(async ({ windowsPage }) => {
    await windowsPage.goto();
  });

  test('My new Test', async ({ windowsPage }) => {
    const resultPage = await windowsPage.clickAndWaitForNewTab();
    await expect(resultPage).toHaveURL(/new-tab.html/);
  });


});