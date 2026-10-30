package pages;

import com.microsoft.playwright.Page;

public class HomePage extends BasePage {
    public HomePage(Page page) {
        super(page);
    }

    public void openHome() {
        open("/");
    }

    public String headingText() {
        return getText("h1");
    }

    public void openFormsPage() {
        page.locator("a[href='/forms.html']").click();
    }
}
