import { test } from "../fixtures/fixtures";
import testData from "../testData/loginData.json";
import testData1 from "../testData/PatientData.json";


// Launch URL before every test
// test.beforeEach(async ({ page }) => {
//     await page.goto(testData.url);
// });
test.beforeEach(async ({ page }) => {
    console.log("BASE_URL:", process.env.BASE_URL);
    await page.goto(process.env.BASE_URL);
});


// Login as doctor
test("login as doctor", async ({ lgnpage, quepg }) => {

    await lgnpage.doctorBtn.click();

});


// Click on queue
test("click on queue", async ({ lgnpage, dctrpage }) => {

    await lgnpage.doctorBtn.click();

    await dctrpage.queuelink.click();

});


// Click on TV display
test("click on tv display", async ({ lgnpage, dctrpage, quepg }) => {

    await lgnpage.doctorBtn.click();

    await dctrpage.queuelink.click();

    await quepg.tvdisplaylink.click();

});


// Click on call next patient
test("click on call next patient", async ({ lgnpage, dctrpage }) => {

    await lgnpage.doctorBtn.click();

    await dctrpage.callnextpatientbtn.waitFor({
        state: "visible"
    });

    await dctrpage.callnextpatientbtn.click();

});


// Patient creation
test("patient creation", async ({ lgnpage, receptnpage, page }) => {

    let patientName = testData1.name;
    let patientMob = testData1.Mobile;
    let patientage = testData1.Age;
    let Gender = testData1.gender;
    let age = testData1.Age;

    // Click on reception
    await lgnpage.receptionBtn.click();

    // Click on new patient
    await receptnpage.newPatientBtn.click();

    // Fill patient details
    await receptnpage.patienttextfield.fill(patientName);
    await receptnpage.mobiletextfield.fill(patientMob);
    await receptnpage.genderDD.selectOption({ label: Gender });
    await receptnpage.ageTextfield.fill(age);

    await receptnpage.savewopay.click();

    await page.waitForTimeout(4000);

    await receptnpage.closebtn.click();

});