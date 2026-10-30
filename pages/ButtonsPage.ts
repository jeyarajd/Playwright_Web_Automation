import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ButtonsPage extends BasePage {
  readonly primaryBtn: Locator;
  readonly secondaryBtn: Locator;
  readonly disabledBtn: Locator;
  readonly delayedBtn: Locator;
  readonly counterBtn: Locator;
  readonly counterValue: Locator;
  readonly loadingBtn: Locator;
  readonly loadingOutput: Locator;
  readonly dblclickBtn: Locator;
  readonly rightclickBtn: Locator;
  readonly toggleBtn: Locator;
  readonly ghostBtn: Locator;
  readonly linkAsButton: Locator;
  readonly linkOutput: Locator;
  readonly clickOutput: Locator;
  readonly loadActionBtn: Locator;
  readonly cards: Locator;

  constructor(page: Page) {
    super(page, '/buttons.html');

    this.primaryBtn = page.getByTestId('button-primary');
    this.secondaryBtn = page.getByTestId('button-secondary');
    this.disabledBtn = page.getByTestId('button-disabled');
    this.delayedBtn = page.getByTestId('button-delayed');
    this.counterBtn = page.getByTestId('button-counter');
    this.counterValue = page.getByTestId('text-counter-value');
    this.loadingBtn = page.getByTestId('button-loading');
    this.loadingOutput = page.getByTestId('text-loading-output');
    this.dblclickBtn = page.getByTestId('button-dblclick');
    this.rightclickBtn = page.getByTestId('button-rightclick');
    this.toggleBtn = page.getByTestId('button-toggle');
    this.ghostBtn = page.getByTestId('button-ghost');
    this.linkAsButton = page.getByTestId('link-styled-as-button');
    this.linkOutput = page.getByTestId('text-link-output');
    this.clickOutput = page.getByTestId('text-click-output');
    this.loadActionBtn = page.getByTestId('button-load-action');
    this.cards = page.getByTestId('card-item');
  }

  async clickCounterTimes(times: number): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.counterBtn.click();
    }
  }

  /**
   * Scoped lookup for the classic "duplicate remove button per row" trap —
   * always find the specific card first, then the button inside it.
   */
  cardByText(text: string): Locator {
    return this.cards.filter({ hasText: text });
  }

  async removeCard(text: string): Promise<void> {
    await this.cardByText(text).getByTestId('button-remove').click();
  }

  async rightClick(): Promise<void> {
    await this.rightclickBtn.click({ button: 'right' });
  }

  async doubleClick(): Promise<void> {
    await this.dblclickBtn.dblclick();
  }
}
