import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";
import testData from  "../testData/loginData.json"
import testData1 from "../testData/PatientData.json"



// test.beforeEach(async ({ page }) => {

//     await page.goto(testData.url);
// });
// test.beforeEach(async ({ page }) => {
//     await page.goto(process.env.BASE_URL);
// });

test.beforeEach(async ({ page }) => {
    console.log("BASE_URL:", process.env.BASE_URL);
    await page.goto(process.env.BASE_URL);
    console.log("Logged in");
    
});

test.afterEach(async ({ lgoutpage  }) => {
     
     await lgoutpage.signOutlnk.click();
   
});
// test("call next patient", async ({ page, lgnpage, dctrpage }) => {
   

//     await lgnpage.doctorBtn.click();

//     await expect(dctrpage.callnextpatientbtn).toBeVisible();

//     await dctrpage.callnextpatientbtn.click();

//     await page.waitForTimeout(2000);
//      await dctrpage.patientsummary.waitFor({
//         state: "visible",
//         timeout: 10000
//     });

//     console.log("Patient summary found");

//    await dctrpage.patientsummary.click();

//    await dctrpage.advicebtn.click();
//    await dctrpage.finishbtn.click();
//  });
test("call next patient", async ({ page, lgnpage, dctrpage }) => {

    await lgnpage.doctorBtn.click();

    await expect(dctrpage.callnextpatientbtn).toBeVisible();

    await dctrpage.callnextpatientbtn.click();

    await page.waitForTimeout(2000);

    console.log("Current URL:", page.url());
console.log("Current page:", await page.locator("body").innerText());

    await expect(dctrpage.patientsummary).toBeVisible({
        timeout: 10000
    });

    await expect(dctrpage.finishbtn).toBeVisible({
        timeout: 10000
    });

    await dctrpage.finishbtn.click();
});

test("patient creation", async ({
    page,
    lgnpage,
    receptnpage
}) => {

    const patientName = testData1.name;
    const patientMob = testData1.Mobile;
    const Gender = testData1.gender;
    const age = testData1.Age;

    await lgnpage.receptionBtn.click();

    await receptnpage.newPatientBtn.click();

    await receptnpage.patienttextfield.fill(patientName);
    await receptnpage.mobiletextfield.fill(patientMob);
    await receptnpage.genderDD.selectOption({ label: Gender });
    await receptnpage.ageTextfield.fill(age);

    await receptnpage.savewopay.click();

    await receptnpage.closebtn.click();

    await receptnpage.tdybookingsbtn.waitFor({
        state: "visible"
    });

    await receptnpage.tdybookingsbtn.click();
});
test("doctor+Queue+Tvdisplay", async ({
    lgnpage,
    dctrpage,
    quepg
}) => {

    await lgnpage.doctorBtn.click();

    await dctrpage.queuelink.click();

    await quepg.multipleTab();
});