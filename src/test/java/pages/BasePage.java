package pages;

import com.microsoft.playwright.Page;

public class BasePage {
    protected static final String BASE_URL = "http://localhost:3001";
    protected final Page page;

    public BasePage(Page page) {
        this.page = page;
    }

    public void open(String path) {
        page.navigate(BASE_URL + path);
    }

    public void toggleTheme() {
        page.locator("#theme-toggle").click();
    }

    public String currentTheme() {
        return page.locator("html").getAttribute("data-theme");
    }

    public void openSidebar() {
        page.locator("#sidebar-toggle").click();
    }

    public void click(String selector) {
        page.locator(selector).click();
    }

    public void type(String selector, String value) {
        page.locator(selector).fill(value);
    }

    public String getText(String selector) {
        return page.locator(selector).textContent();
    }
}

