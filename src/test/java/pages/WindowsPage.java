package pages;

import com.microsoft.playwright.Page;

public class WindowsPage extends BasePage {
    public WindowsPage(Page page) {
        super(page);
    }

    public void openWindowsPage() {
        open("/windows.html");
    }

    public void openNewWindow() {
        click("#open-window-btn");
    }

    public String popupText() {
        return getText("body");
    }
}
