class LoginPage{
    constructor(page){
        this.receptionBtn=page.locator("//button[@formaction='/demo-login/receptionist']")
        this.doctorBtn=page.locator("//button[@formaction='/demo-login/doctor']")
        this.nurseBtn=page.locator("//button[@formaction='/demo-login/nurse']")
        this.laboratoryBtn=page.locator("//button[@formaction='/demo-login/lab']")
        
    }
   
}
export default LoginPage