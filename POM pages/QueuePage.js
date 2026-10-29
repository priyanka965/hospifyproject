import { expect } from "playwright/test";

class QueuePage {
    constructor(page) {
        this.page = page;
        this.tvdisplaylink = page.locator("//a[@rel='noopener']");
    }

    async multipleTab() {

        let [window2] = await Promise.all([
            this.page.waitForEvent("popup"),
            this.tvdisplaylink.click()
        ]);

        await window2.locator("//button[text()='Without sound']").click();

        let title1 = await this.page.title();

        await expect(window2).not.toHaveTitle(title1);
    }
}

export default QueuePage;