export class User {
    private Email:string;
    private Username:string;
    private FirstName:string;
    private LastName:string;
    private RoleName:string;
    private Password:string;
    private id:string;
    private Studies:string;
    private ModuleName:string;
    private Year:string;
    
constructor(email:string,userName:string,firstName:string,lastName:string,roleName:string,password:string,
studies:string,moduleName:string,year:string){
    this.Email=email;
    this.Username=userName;
    this.FirstName=firstName;
    this.LastName=lastName;
    this.RoleName=roleName;
    this.Password=password;
    this.Studies=studies;
    this.ModuleName=moduleName;
    this.Year=year;
}

public getID():string{
    return this.id;
}

}