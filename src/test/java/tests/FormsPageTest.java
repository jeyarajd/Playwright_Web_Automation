package tests;

import org.testng.annotations.Test;
import pages.FormsPage;

import static org.testng.Assert.assertTrue;

public class FormsPageTest extends BaseTest {
    @Test
    public void fillsAndSubmitsTheForm() {
        FormsPage formsPage = new FormsPage(page);
        formsPage.openFormsPage();
        formsPage.submitForm("Ada Lovelace", "ada@example.com");

        String output = formsPage.outputText();
        assertTrue(output.contains("Ada Lovelace"));
        assertTrue(output.contains("ada@example.com"));
    }
}
