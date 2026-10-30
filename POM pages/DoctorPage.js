class DoctorPage{
    constructor(page){
        //this.callnextpatientbtn=page.locator("//button[text()='Call next patient →']")
          //this.callnextpatientbtn=page.getByRole("button", { name: /A-3 Laila Khan/ })
//           this.callnextpatientbtn = page.getByRole("button", {
//     name: /Call next patient/i
// });
this.callnextpatientbtn =
    page.locator('button[wire\\:click="callNext"]');
        //this.patientsummary=page.locator("//span[text()='Patient summary']")
        this.patientsummary = page.getByText("Patient summary", { exact: false });
        this.advicebtn=page.locator("//button[text()='+ Antibiotic course']").first()
        this.complainttextfield=page.locator("//textarea[@placeholder='e.g. Headache and dizziness for 5 days']")
        this.finishbtn=page.locator("//button[text()='Finish & print prescription (F9)']")
        this.printbtn=page.locator("//a[text()='Print']")
        this.queuelink=page.locator("//span[text()='Queue']")
        this.signOutlnk=page.locator("//button[text()='Sign out']")
        

    }
    async printPrescription(){
        let printbtn=page.waitForEvent("printbtn")
        this.printbtn=page.locator("//a[text()='Print']")

        let downloadfile=await printbtn 
        //downloading file to project folder
        let downloadfolder="C:/Users/adigo/OneDrive/Desktop/hospify/downloadfile"
        let filename=downloadfile.suggestedFilename()
       let fullpath=path.join(downloadfolder,filename)
       //await downloadfile.saveAs(path.join(__dirname,"../../downloadfile",filename))
       await downloadfile.saveAs(path.join(downloadfolder,filename))


    }
}
export default DoctorPage