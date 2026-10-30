import { test as base, type ConsoleMessage } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { FormsPage } from '../pages/FormsPage';
import { ButtonsPage } from '../pages/ButtonsPage';
import { TablesPage } from '../pages/TablesPage';
import { FramesPage } from '../pages/FramesPage';
import { DialogsPage } from '../pages/DialogsPage';
import { DynamicPage } from '../pages/DynamicPage';
import { DragDropPage } from '../pages/DragDropPage';
import { WindowsPage } from '../pages/WindowsPage';
import { LocatorsPage } from '../pages/LocatorsPage';
import { AutosuggestPage } from '../pages/AutosuggestPage';

/**
 * This is the second half of the Page Object Model pattern: a custom `test`
 * that hands every spec a ready-made Page Object instead of each spec file
 * constructing `new FormsPage(page)` by hand.
 *
 * Usage in a spec file:
 *
 *   import { test, expect } from '../fixtures';
 *
 *   test('submits the form', async ({ formsPage }) => {
 *     await formsPage.goto();
 *     ...
 *   });
 *
 * Fixtures are created lazily — a spec that only destructures `buttonsPage`
 * never pays the cost of constructing the other ten Page Objects.
 */
type Pages = {
  homePage: HomePage;
  formsPage: FormsPage;
  buttonsPage: ButtonsPage;
  tablesPage: TablesPage;
  framesPage: FramesPage;
  dialogsPage: DialogsPage;
  dynamicPage: DynamicPage;
  dragDropPage: DragDropPage;
  windowsPage: WindowsPage;
  locatorsPage: LocatorsPage;
  autosuggestPage: AutosuggestPage;
};

type Fixtures = Pages & {
  browserConsole: void;
};

export const test = base.extend<Fixtures>({
  browserConsole: [async ({ page }, use, testInfo) => {
    const logConsole = async (msg: ConsoleMessage) => {
      const values = await Promise.all(msg.args().map(async (arg) => arg.jsonValue()));
      const renderedArgs = values
        .map((value) => (typeof value === 'string' ? value : JSON.stringify(value)))
        .join(' ');

      console.log(`[browser:${msg.type()}][${testInfo.title}] ${renderedArgs}`.trim());
    };

    page.on('console', logConsole);
    await use();
    page.off('console', logConsole);
  }, { auto: true }],
  homePage: async ({ page }, use) => use(new HomePage(page)),
  formsPage: async ({ page }, use) => use(new FormsPage(page)),
  buttonsPage: async ({ page }, use) => use(new ButtonsPage(page)),
  tablesPage: async ({ page }, use) => use(new TablesPage(page)),
  framesPage: async ({ page }, use) => use(new FramesPage(page)),
  dialogsPage: async ({ page }, use) => use(new DialogsPage(page)),
  dynamicPage: async ({ page }, use) => use(new DynamicPage(page)),
  dragDropPage: async ({ page }, use) => use(new DragDropPage(page)),
  windowsPage: async ({ page }, use) => use(new WindowsPage(page)),
  locatorsPage: async ({ page }, use) => use(new LocatorsPage(page)),
  autosuggestPage: async ({ page }, use) => use(new AutosuggestPage(page)),
});

export { expect } from '@playwright/test';
