import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TablesPage extends BasePage {
  readonly staticTable: Locator;
  readonly sortableTable: Locator;
  readonly editableTable: Locator;
  readonly paginatedTable: Locator;

  readonly thSortName: Locator;
  readonly thSortRole: Locator;
  readonly thSortScore: Locator;

  readonly filterInput: Locator;

  readonly newTaskInput: Locator;
  readonly newOwnerInput: Locator;
  readonly addRowBtn: Locator;

  readonly paginationNav: Locator;

  constructor(page: Page) {
    super(page, '/tables.html');

    this.staticTable = page.getByTestId('table-static');
    this.sortableTable = page.getByTestId('table-sortable');
    this.editableTable = page.getByTestId('table-editable');
    this.paginatedTable = page.getByTestId('table-paginated');

    this.thSortName = page.getByTestId('th-sort-name');
    this.thSortRole = page.getByTestId('th-sort-role');
    this.thSortScore = page.getByTestId('th-sort-score');

    this.filterInput = page.getByTestId('input-table-filter');

    this.newTaskInput = page.getByTestId('input-new-task');
    this.newOwnerInput = page.getByTestId('input-new-owner');
    this.addRowBtn = page.getByTestId('button-add-row');

    this.paginationNav = page.getByTestId('pagination-nav');
  }

  async sortByName(): Promise<void> {
    await this.thSortName.click();
  }

  async sortByRole(): Promise<void> {
    await this.thSortRole.click();
  }

  async sortByScore(): Promise<void> {
    await this.thSortScore.click();
  }

  async filterBy(text: string): Promise<void> {
    await this.filterInput.fill(text);
  }

  sortableRows(): Locator {
    return this.sortableTable.locator('tbody tr');
  }

  paginatedRows(): Locator {
    return this.paginatedTable.locator('tbody tr');
  }

  async addRow(task: string, owner: string): Promise<void> {
    await this.newTaskInput.fill(task);
    await this.newOwnerInput.fill(owner);
    await this.addRowBtn.click();
  }

  /** Scoped row lookup — never delete-by-index, always by content. */
  rowByTask(task: string): Locator {
    return this.editableTable.getByTestId('row-task').filter({ hasText: task });
  }

  async deleteRow(task: string): Promise<void> {
    await this.rowByTask(task).getByTestId('button-delete-row').click();
  }

  paginationButton(name: string | RegExp): Locator {
    return this.paginationNav.getByRole('button', { name });
  }
}
