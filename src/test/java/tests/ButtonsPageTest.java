package tests;

import org.testng.annotations.Test;
import pages.ButtonsPage;

import static org.testng.Assert.assertEquals;

public class ButtonsPageTest extends BaseTest {
    @Test
    public void primaryButtonUpdatesTheOutput() {
        ButtonsPage buttonsPage = new ButtonsPage(page);
        buttonsPage.openButtonsPage();
        buttonsPage.clickPrimaryButton();

        assertEquals(buttonsPage.outputText(), "Primary button clicked");
    }
}
