import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly moduleTable: Locator;
  readonly moduleTableWrap: Locator;

  constructor(page: Page) {
    super(page, '/index.html');
    this.moduleTable = page.locator('table').first();
    this.moduleTableWrap = this.moduleTable.locator('..');
  }

  /** All module links in the "Modules at a glance" table, in row order. */
  moduleLinks(): Locator {
    return this.moduleTable.locator('a');
  }

  async moduleLinkCount(): Promise<number> {
    return this.moduleLinks().count();
  }

  async openModuleByName(name: string | RegExp): Promise<void> {
    await this.moduleTable.getByRole('link', { name }).click();
  }
}
