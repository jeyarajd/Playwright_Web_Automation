import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export type PaymentMethod = 'card' | 'bank' | 'paypal';

export class FormsPage extends BasePage {
  readonly fullName: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly website: Locator;
  readonly lockedInput: Locator;
  readonly ghostSearch: Locator;
  readonly birthdate: Locator;
  readonly color: Locator;
  readonly quantity: Locator;
  readonly volume: Locator;
  readonly volumeValue: Locator;
  readonly bio: Locator;

  readonly radioCard: Locator;
  readonly radioBank: Locator;
  readonly radioPaypal: Locator;

  readonly selectAll: Locator;
  readonly channelEmail: Locator;
  readonly channelPush: Locator;
  readonly channelSms: Locator;

  readonly termsCheckbox: Locator;
  readonly countrySelect: Locator;
  readonly skillsSelect: Locator;

  readonly submitBtn: Locator;
  readonly resetBtn: Locator;
  readonly output: Locator;

  constructor(page: Page) {
    super(page, '/forms.html');

    this.fullName = page.getByTestId('input-full-name');
    this.email = page.getByTestId('input-email');
    this.phone = page.getByTestId('input-phone');
    this.website = page.getByTestId('input-website');
    this.lockedInput = page.getByTestId('input-locked');
    this.ghostSearch = page.getByTestId('input-ghost-search');
    this.birthdate = page.getByTestId('input-birthdate');
    this.color = page.getByTestId('input-color');
    this.quantity = page.getByTestId('input-quantity');
    this.volume = page.getByTestId('input-volume');
    this.volumeValue = page.getByTestId('text-volume-value');
    this.bio = page.getByTestId('textarea-bio');

    this.radioCard = page.getByTestId('radio-payment-card');
    this.radioBank = page.getByTestId('radio-payment-bank');
    this.radioPaypal = page.getByTestId('radio-payment-paypal');

    this.selectAll = page.getByTestId('checkbox-select-all');
    this.channelEmail = page.getByTestId('checkbox-channel-email');
    this.channelPush = page.getByTestId('checkbox-channel-push');
    this.channelSms = page.getByTestId('checkbox-channel-sms');

    this.termsCheckbox = page.getByTestId('checkbox-terms');
    this.countrySelect = page.getByTestId('select-country');
    this.skillsSelect = page.getByTestId('select-skills');

    this.submitBtn = page.getByTestId('button-submit-form');
    this.resetBtn = page.getByTestId('button-reset-form');
    this.output = page.getByTestId('text-form-output');
  }

  /** High-level workflow method — this is the POM payoff: tests read like sentences. */
  async fillBasicInfo(name: string, email: string, phone?: string): Promise<void> {
    await this.fullName.fill(name);
    await this.email.fill(email);
    if (phone) await this.phone.fill(phone);
  }

  async selectPaymentMethod(method: PaymentMethod): Promise<void> {
    const map: Record<PaymentMethod, Locator> = {
      card: this.radioCard,
      bank: this.radioBank,
      paypal: this.radioPaypal,
    };
    await map[method].check();
  }

  async selectSkills(values: string[]): Promise<void> {
    await this.skillsSelect.selectOption(values);
  }

  async acceptTerms(): Promise<void> {
    await this.termsCheckbox.check();
  }

  async submit(): Promise<void> {
    await this.submitBtn.click();
  }

  async reset(): Promise<void> {
    await this.resetBtn.click();
  }

  /** Parses the JSON the page renders after submit — handy for one assertion per field. */
  async getOutputJson(): Promise<Record<string, unknown>> {
    const text = await this.output.textContent();
    return JSON.parse(text ?? '{}');
  }
}
