package pages;

import com.microsoft.playwright.Page;

public class FormsPage extends BasePage {
    public FormsPage(Page page) {
        super(page);
    }

    public void openFormsPage() {
        open("/forms.html");
    }

    public void submitForm(String name, String emailAddress) {
        type("#full-name", name);
        type("#email", emailAddress);
        click("#submit-form");
    }

    public String outputText() {
        return getText("#form-output");
    }

    public void resetForm() {
        click("#reset-form");
    }
}
