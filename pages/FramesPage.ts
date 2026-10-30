import { Page, Locator, FrameLocator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FramesPage extends BasePage {
  readonly basicFrameEl: Locator;
  readonly outerFrameEl: Locator;
  readonly loadFrameBtn: Locator;

  constructor(page: Page) {
    super(page, '/frames.html');

    this.basicFrameEl = page.getByTestId('iframe-basic');
    this.outerFrameEl = page.getByTestId('iframe-outer');
    this.loadFrameBtn = page.getByTestId('button-load-frame');
  }

  /** frameLocator() is how you reach INSIDE an iframe — a plain locator only sees the parent DOM. */
  basicFrame(): FrameLocator {
    return this.page.frameLocator('[data-testid="iframe-basic"]');
  }

  outerFrame(): FrameLocator {
    return this.page.frameLocator('[data-testid="iframe-outer"]');
  }

  /** Chain frameLocator() again on the outer frame to reach the nested inner frame. */
  nestedInnerFrame(): FrameLocator {
    return this.outerFrame().frameLocator('[data-testid="iframe-nested-inner"]');
  }

  /** The lazy iframe has no data-testid until after loadLazyFrame() runs — locate by tag once it exists. */
  lazyFrame(): FrameLocator {
    return this.page.frameLocator('[data-testid="iframe-lazy"]');
  }

  async loadLazyFrame(): Promise<void> {
    await this.loadFrameBtn.click();
  }
}
