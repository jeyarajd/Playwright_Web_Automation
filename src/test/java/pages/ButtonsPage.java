package pages;

import com.microsoft.playwright.Page;

public class ButtonsPage extends BasePage {
    public ButtonsPage(Page page) {
        super(page);
    }

    public void openButtonsPage() {
        open("/buttons.html");
    }

    public void clickPrimaryButton() {
        click("#primary-btn");
    }

    public void clickSecondaryButton() {
        click("#secondary-btn");
    }

    public void clickCounterButton() {
        click("#counter-btn");
    }

    public String outputText() {
        return getText("#button-output");
    }
}
