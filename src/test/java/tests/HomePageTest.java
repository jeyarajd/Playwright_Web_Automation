package tests;

import org.testng.annotations.Test;
import pages.HomePage;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

public class HomePageTest extends BaseTest {
    @Test
    public void homePageLoadsAndNavigates() {
        HomePage homePage = new HomePage(page);
        homePage.openHome();

        assertEquals(homePage.headingText(), "Learning Playground");
        homePage.openFormsPage();

        assertTrue(page.url().contains("forms.html"));
    }
}
