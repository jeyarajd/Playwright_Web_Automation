import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AutosuggestPage extends BasePage {
  readonly typeaheadInput: Locator;
  readonly typeaheadList: Locator;
  readonly typeaheadSelected: Locator;

  readonly datalistInput: Locator;

  readonly tagInputBox: Locator;
  readonly tagInput: Locator;
  readonly tagPills: Locator;
  readonly tagSummary: Locator;

  readonly rangeDateInput: Locator;
  readonly weekInput: Locator;

  constructor(page: Page) {
    super(page, '/autosuggest.html');

    this.typeaheadInput = page.getByTestId('input-typeahead');
    this.typeaheadList = page.getByTestId('list-typeahead');
    this.typeaheadSelected = page.getByTestId('text-typeahead-selected');

    this.datalistInput = page.getByTestId('input-datalist');

    this.tagInputBox = page.getByTestId('tag-input-box');
    this.tagInput = page.getByTestId('input-tag');
    this.tagPills = page.getByTestId('tag-pill');
    this.tagSummary = page.getByTestId('text-tag-summary');

    this.rangeDateInput = page.getByTestId('input-range-date');
    this.weekInput = page.getByTestId('input-week');
  }

  suggestionItems(): Locator {
    return this.typeaheadList.getByTestId('suggest-item');
  }

  async search(query: string): Promise<void> {
    await this.typeaheadInput.fill(query);
  }

  async selectHighlightedSuggestion(): Promise<void> {
    await this.typeaheadInput.press('ArrowDown');
    await this.typeaheadInput.press('Enter');
  }

  async addTag(value: string, delimiter: 'Enter' | ',' = 'Enter'): Promise<void> {
    await this.tagInput.fill(value);
    await this.tagInput.press(delimiter === ',' ? ',' : 'Enter');
  }

  /** Scoped by the tag's own text — never remove "the first pill" blindly. */
  tagPillByText(text: string): Locator {
    return this.tagPills.filter({ hasText: text });
  }

  async removeTag(text: string): Promise<void> {
    await this.tagPillByText(text).getByTestId('button-remove-tag').click();
  }
}
