import { Page, Locator } from '@playwright/test';

/**
 * BasePage holds everything every page in the site shares:
 * navigation, the theme toggle, and the mobile sidebar.
 *
 * Every other Page Object extends this class instead of duplicating
 * these locators/methods on each page.
 */
export class BasePage {
  readonly page: Page;
  readonly path: string;

  readonly themeToggle: Locator;
  readonly sidebarToggle: Locator;
  readonly sidebar: Locator;

  constructor(page: Page, path: string) {
    this.page = page;
    this.path = path;

    this.themeToggle = page.getByTestId('theme-toggle');
    this.sidebarToggle = page.getByTestId('sidebar-toggle');
    this.sidebar = page.locator('[data-sidebar]');
  }

  /** Navigate directly to this page. */
  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }

  /** Click the theme toggle. Returns nothing — assert the result in the test. */
  async toggleTheme(): Promise<void> {
    await this.themeToggle.click();
  }

  /** Reads the current theme straight off <html data-theme="...">. */
  async currentTheme(): Promise<string | null> {
    return this.page.locator('html').getAttribute('data-theme');
  }

  /** Opens the sidebar on mobile viewports. */
  async openMobileSidebar(): Promise<void> {
    await this.sidebarToggle.click();
  }

  /** Locator for a sidebar nav link by its visible text, e.g. "Forms & Inputs". */
  navLink(name: string | RegExp): Locator {
    return this.sidebar.getByRole('link', { name });
  }

  /** Navigate via the sidebar instead of page.goto — useful for nav-flow tests. */
  async navigateTo(name: string | RegExp): Promise<void> {
    await this.navLink(name).click();
  }
}
