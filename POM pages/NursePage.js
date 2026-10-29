

class NursePage {
    constructor(page) {
        this.page = page;

        this.nursebtn = page.getByRole("button", {
            name: /Nurse Vitals, IPD wards/
        });

        this.icupatientbtn = page.getByRole("button", {
            name: "Bed ICU-01 Occupied"
        });

        this.addnote = page.locator(
            "input[placeholder='Write a note…']"
        );

        this.addbtn = page.getByRole("button", {
            name: "Add",
            exact: true
        });
    }

    async addICUNote(note) {
        await this.icupatientbtn.click();
        await this.addnote.waitFor({ state: "visible" });
        await this.addnote.fill(note);
        await this.addbtn.click();
    }
}

export default NursePage;