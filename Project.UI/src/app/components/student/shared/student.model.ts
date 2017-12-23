export class Student {
    private firstName:string;
    private lastName:string;
    private averageGrade:number;
    private demonstrationHours:number;
	private UserID:number;

constructor(firstName:string,lastName:string,averageGrade:number,demonstrationHours:number){
    this.firstName=firstName;
    this.lastName=lastName;
    this.averageGrade=averageGrade;
    this.demonstrationHours=demonstrationHours;
}

public setUsername(firstName:string,lastName:string){
    this.firstName=firstName;
    this.lastName=lastName;
}

public getUsername():string{
    return this.lastName+" "+this.firstName;
}
public getAverageGrade():number{
    return this.averageGrade;
}
public getDemonstrationHours():number{
    return this.demonstrationHours;
}
public getId():number{
    return this.UserID;
}

}