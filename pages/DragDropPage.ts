import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DragDropPage extends BasePage {
  readonly reorderList: Locator;
  readonly reorderItems: Locator;

  readonly backlogList: Locator;
  readonly doneList: Locator;

  readonly fileInput: Locator;
  readonly dropzone: Locator;
  readonly fileList: Locator;

  readonly downloadBtn: Locator;

  constructor(page: Page) {
    super(page, '/dragdrop.html');

    this.reorderList = page.getByTestId('list-reorder');
    this.reorderItems = this.reorderList.getByTestId('dnd-item');

    this.backlogList = page.getByTestId('list-backlog');
    this.doneList = page.getByTestId('list-done');

    this.fileInput = page.getByTestId('input-file');
    this.dropzone = page.getByTestId('dropzone');
    this.fileList = page.getByTestId('file-list');

    this.downloadBtn = page.getByTestId('button-download');
  }

  /** Native HTML5 drag-and-drop between two arbitrary locators. */
  async dragItem(source: Locator, target: Locator): Promise<void> {
    await source.dragTo(target);
  }

  async reorderItemTexts(): Promise<string[]> {
    return this.reorderItems.allTextContents();
  }

  backlogCards(): Locator {
    return this.backlogList.getByTestId('dnd-card');
  }

  doneCards(): Locator {
    return this.doneList.getByTestId('dnd-card');
  }

  async uploadFile(filePath: string | string[]): Promise<void> {
    await this.fileInput.setInputFiles(filePath);
  }

  async downloadSample() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadBtn.click();
    return downloadPromise;
  }
}
