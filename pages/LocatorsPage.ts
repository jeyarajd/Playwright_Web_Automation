import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LocatorsPage extends BasePage {
  readonly dupIdFirst: Locator;
  readonly dupIdSecond: Locator;

  readonly rows: Locator;
  readonly viewOutput: Locator;

  readonly twinVisible: Locator;
  readonly twinHidden: Locator;
  readonly twinOffscreen: Locator;
  readonly twinZeroOpacity: Locator;

  readonly stableTargetBtn: Locator;
  readonly currentIdText: Locator;

  readonly shadowWidget: Locator;
  readonly shadowOutput: Locator;

  readonly whitespaceBtn: Locator;
  readonly unicodeText: Locator;

  constructor(page: Page) {
    super(page, '/locators.html');

    // getByTestId resolves to id "dup-id" for BOTH — use the testid attribute selector
    // directly rather than page.locator('#dup-id'), which would violate strict mode.
    this.dupIdFirst = page.getByTestId('dup-id-first');
    this.dupIdSecond = page.getByTestId('dup-id-second');

    this.rows = page.getByTestId('row-order');
    this.viewOutput = page.getByTestId('text-view-output');

    this.twinVisible = page.getByTestId('twin-visible');
    this.twinHidden = page.getByTestId('twin-hidden');
    this.twinOffscreen = page.getByTestId('twin-offscreen');
    this.twinZeroOpacity = page.getByTestId('twin-zero-opacity');

    this.stableTargetBtn = page.getByTestId('button-stable-target');
    this.currentIdText = page.getByTestId('text-current-id');

    this.shadowWidget = page.getByTestId('shadow-widget');
    this.shadowOutput = page.getByTestId('text-shadow-output');

    this.whitespaceBtn = page.getByTestId('button-whitespace');
    this.unicodeText = page.getByTestId('text-unicode');
  }

  /** Row lookup scoped by visible id text, e.g. "#1042" — avoids clicking the wrong row's View button. */
  rowByOrderId(orderId: string): Locator {
    return this.rows.filter({ hasText: orderId });
  }

  async viewRow(orderId: string): Promise<void> {
    await this.rowByOrderId(orderId).getByTestId('button-view').click();
  }

  /** The button lives inside a Shadow DOM root — Playwright locators pierce it automatically. */
  shadowButton(): Locator {
    return this.shadowWidget.locator('button');
  }
}
