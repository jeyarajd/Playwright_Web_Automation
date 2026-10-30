import {Page,Locator } from '@playwright/test'
import {BasePage} from  './BasePage'


export class WindowsPage extends BasePage{
    readonly open_new_window_link: Locator;
    readonly windowHeading: Locator;
    readonly one_popup_button: Locator;
    readonly receive_message_text: Locator;

    constructor(page:Page){
        super(page,'/windows.html');
        this.open_new_window_link = page.getByTestId('link-new-tab');
        this.windowHeading = page.getByRole('heading', {name:'Windows & tabs'});
        this.one_popup_button = page.getByTestId('button-open-popup');
        this.receive_message_text = page.getByTestId('text-popup-message');
        this.one_popup_button = page.getByRole('button', {name: 'Open popup'});
    }

    async clickAndWaitForNewTab(): Promise<Page> {
        const [newPage] = await Promise.all(
            [this.page.waitForEvent('popup'),
            this.open_new_window_link.click()]
        );
        return newPage;
    }

}
