class ReceptionPage{
    constructor(page){
        this.newPatientBtn=page.locator("//button[text()='+ New patient']")
        this.patienttextfield=page.locator("//input[@id='fdname']")
        this.mobiletextfield=page.locator("//input[@id='fdmobile']")
       // this.genderDD=page.locator("(//div[@class='f c1'])[1]")
       this.genderDD = page.locator("select").first();
         
        // this.ageTextfield=page.locator("//div[@class='f c1'][2]")
         this.ageTextfield=page.locator("//input[@placeholder='Y']")
         this.savewopay=page.locator("//button[text()='Save without payment']")
         //this.closereciept=page.locator("//button[@aria-label='Close']")
         this.closebtn=page.getByRole("Button",{name:"×"})

         //this.printbtn=page.getByRole("Button",{name:"Print"})
        //this.tdybookingsbtn = page.getByText("Today's Bookings", { exact: true });
      //  this.tdybookingsbtn =page.getByRole("link", { name: "Today's Bookings" })
      this.appointbtn=page.locator("//span[text()='Appointments']")
      this.tdybookingsbtn = page.locator("a[href='/appointments']").first();
    //   this.bookbtn= page.getByRole("button", { name: "+ Book" }).first()
    //   this.patientsearchfield=page.locator("//input[@placeholder='Find patient: name, phone or UHID']")
    //   this.bookingdate=page.locator("//button[@data-day-card='2026-10-27']")
    //  this.bookappntbtn=page.locator("//button[text()='Book appointment']")
    // Open appointment form
     this.newappntmnt = page.getByRole("button", {
    name: "+ New appointment"
});
     this.namesearchfield=page
        .getByPlaceholder("Find patient: name, phone or UHID")
     this.docDD=page.locator("//button[text()='Choose a doctor…']")
      this.bookappntbtn=page.locator("//button[text()='Book appointment']")

    
    

}
}
export default ReceptionPage