# Playwright Learning Framework

A minimal Playwright + TypeScript test framework using the Page Object Model, set up for learning.

## Structure

```
playwright-learning/
├── pages/              # Page Object classes (one class per page/component)
│   ├── BasePage.ts
│   └── TodoPage.ts
├── fixtures/           # Custom test fixtures that inject page objects into tests
│   └── pages.ts
├── tests/              # Test specs
│   ├── example.spec.ts # Basic smoke tests against playwright.dev
│   └── todo.spec.ts    # POM-based tests against the TodoMVC demo app
├── playwright.config.ts
└── package.json
```

## Getting started

Install browsers (only needed once):

```powershell
npx playwright install
```

Run all tests:

```powershell
npm test
```

Other useful commands:

```powershell
npm run test:headed   # run with a visible browser
npm run test:ui       # open the Playwright UI test runner
npm run report        # open the last HTML report
```

## Learning path

1. Start with `tests/example.spec.ts` — basic navigation and assertions.
2. Read `pages/TodoPage.ts` to see how selectors and actions are wrapped in a Page Object.
3. Read `fixtures/pages.ts` to see how the `todoPage` fixture is provided to tests automatically.
4. Look at `tests/todo.spec.ts` to see the Page Object used in real tests.
5. Try adding a new page object (e.g. for a login page) and a new spec file for it.
