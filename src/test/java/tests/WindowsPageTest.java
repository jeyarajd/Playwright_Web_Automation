package tests;

import com.microsoft.playwright.Page;
import org.testng.annotations.Test;
import pages.WindowsPage;

import static org.testng.Assert.assertTrue;

public class WindowsPageTest extends BaseTest {
    @Test
    public void opensANewWindowAndShowsPopupContent() {
        WindowsPage windowsPage = new WindowsPage(page);
        windowsPage.openWindowsPage();

        Page popup = page.waitForPopup(() -> windowsPage.openNewWindow());

        assertTrue(popup.url().contains("popup.html"));
        assertTrue(popup.locator("h1").textContent().contains("Popup window opened"));
    }
}
