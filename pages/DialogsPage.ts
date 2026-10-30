import { Page, Locator, Dialog } from '@playwright/test';
import { BasePage } from './BasePage';

export class DialogsPage extends BasePage {
  readonly alertBtn: Locator;
  readonly confirmBtn: Locator;
  readonly promptBtn: Locator;
  readonly output: Locator;

  readonly openModalBtn: Locator;
  readonly modalOverlay: Locator;
  readonly modalConfirmBtn: Locator;
  readonly modalCancelBtn: Locator;

  readonly showToastBtn: Locator;
  readonly toast: Locator;

  readonly tooltipTrigger: Locator;
  readonly tooltipBubble: Locator;

  constructor(page: Page) {
    super(page, '/dialogs.html');

    this.alertBtn = page.getByTestId('button-alert');
    this.confirmBtn = page.getByTestId('button-confirm');
    this.promptBtn = page.getByTestId('button-prompt');
    this.output = page.getByTestId('text-dialog-output');

    this.openModalBtn = page.getByTestId('button-open-modal');
    this.modalOverlay = page.getByTestId('modal-overlay');
    this.modalConfirmBtn = page.getByTestId('button-modal-confirm');
    this.modalCancelBtn = page.getByTestId('button-modal-cancel');

    this.showToastBtn = page.getByTestId('button-show-toast');
    this.toast = page.getByTestId('toast');

    this.tooltipTrigger = page.getByTestId('button-tooltip-trigger');
    this.tooltipBubble = page.getByTestId('tooltip-bubble');
  }

  /**
   * Native dialogs (alert/confirm/prompt) must be handled via page.once('dialog', ...)
   * registered BEFORE the triggering click, or Playwright/Chromium blocks on it.
   */
  async triggerAndAccept(trigger: Locator, promptText?: string): Promise<Dialog> {
    const dialogPromise = this.page.waitForEvent('dialog');
    await trigger.click();
    const dialog = await dialogPromise;
    await dialog.accept(promptText);
    return dialog;
  }

  async triggerAndDismiss(trigger: Locator): Promise<Dialog> {
    const dialogPromise = this.page.waitForEvent('dialog');
    await trigger.click();
    const dialog = await dialogPromise;
    await dialog.dismiss();
    return dialog;
  }

  async openModal(): Promise<void> {
    await this.openModalBtn.click();
  }

  async closeModalWithEscape(): Promise<void> {
    await this.page.keyboard.press('Escape');
  }
}
