import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DynamicPage extends BasePage {
  readonly delayedRenderText: Locator;
  readonly pollCounter: Locator;
  readonly staleSlot: Locator;
  readonly coveredBtn: Locator;
  readonly overlayLoading: Locator;
  readonly showVanishingBtn: Locator;
  readonly startProgressBtn: Locator;
  readonly progressTrack: Locator;
  readonly progressFill: Locator;
  readonly progressLabel: Locator;
  readonly showMovingBtn: Locator;
  readonly movingTargetBtn: Locator;
  readonly infiniteScrollBox: Locator;

  constructor(page: Page) {
    super(page, '/dynamic.html');

    this.delayedRenderText = page.getByTestId('text-delayed-render');
    this.pollCounter = page.getByTestId('text-poll-counter');
    this.staleSlot = page.getByTestId('stale-slot');
    this.coveredBtn = page.getByTestId('button-covered');
    this.overlayLoading = page.getByTestId('overlay-loading');
    this.showVanishingBtn = page.getByTestId('button-show-vanishing');
    this.startProgressBtn = page.getByTestId('button-start-progress');
    this.progressTrack = page.getByTestId('progress-track');
    this.progressFill = page.getByTestId('progress-fill');
    this.progressLabel = page.getByTestId('text-progress-label');
    this.showMovingBtn = page.getByTestId('button-show-moving');
    this.movingTargetBtn = page.getByTestId('button-moving-target');
    this.infiniteScrollBox = page.getByTestId('infinite-scroll-box');
  }

  async startProgress(): Promise<void> {
    await this.startProgressBtn.click();
  }

  async revealMovingTarget(): Promise<void> {
    await this.showMovingBtn.click();
  }

  /** Rows load 10 at a time up to 50 total as you scroll the box to its bottom. */
  infiniteScrollRows(): Locator {
    return this.infiniteScrollBox.getByTestId('row-scroll');
  }

  async scrollInfiniteListToBottom(): Promise<void> {
    await this.infiniteScrollBox.evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    });
  }
}
