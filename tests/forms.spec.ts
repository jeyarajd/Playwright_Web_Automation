import { test, expect } from '../fixtures/fixtures';

test.describe('Forms & Inputs', () => {
  test.beforeEach(async ({ formsPage }) => {
    await formsPage.goto();
  });

  test('collects every field type correctly on submit', async ({ formsPage }) => {
    await formsPage.fillBasicInfo('Ada Lovelace', 'ada@example.com', '+1 555 0100');
    await formsPage.bio.fill('QA automation engineer.');
    await formsPage.selectPaymentMethod('card');
    await formsPage.channelEmail.check();
    await formsPage.selectSkills(['playwright', 'selenium']);
    await formsPage.acceptTerms();
    await formsPage.submit();

    // The output JSON keys come straight from each field's HTML `name` attribute
    // (the page builds it via FormData) — "payment", not "paymentMethod".
    const output = await formsPage.getOutputJson();
    expect(output.fullName).toBe('Ada Lovelace');
    expect(output.email).toBe('ada@example.com');
    expect(output.payment).toBe('card');
  });

  test('"select all" reaches an indeterminate state with a partial selection', async ({ formsPage }) => {
    await formsPage.channelEmail.check();
    // Only one of three channel checkboxes is checked — the parent should be indeterminate, not checked.
    const isIndeterminate = await formsPage.selectAll.evaluate(
      (el) => (el as HTMLInputElement).indeterminate
    );
    expect(isIndeterminate).toBe(true);
  });

  test('disabled field rejects edits', async ({ formsPage }) => {
    // input-locked is actually `disabled` (not `readonly`) in the markup.
    await expect(formsPage.lockedInput).toBeDisabled();
    const before = await formsPage.lockedInput.inputValue();

    // fill() waits for the target to become "editable" — a disabled field never
    // does, so it times out rather than silently no-op'ing. That IS the lesson:
    // give it a short explicit timeout instead of inheriting the test's full one.
    await expect(formsPage.lockedInput.fill('attempted edit', { timeout: 2000 })).rejects.toThrow();

    await expect(formsPage.lockedInput).toHaveValue(before);
  });

  test('reset clears the form back to defaults', async ({ formsPage }) => {
    await formsPage.fullName.fill('Temporary Name');
    await formsPage.reset();
    await expect(formsPage.fullName).toHaveValue('');
  });
});
