import { Student } from "../../student/shared/student.model";
export class Professor {
    private firstName:string;
    private lastName:string;
    private studentList:Array<Student>;
	private UserID:number;

    constructor(firstName:string,lastName:string,studentList:Student[]){
        this.firstName=firstName;
        this.lastName=lastName;
        this.studentList=studentList;
    }

    public setUsername(firstName:string,lastName:string){
        this.firstName=firstName;
        this.lastName=lastName;
    }

    public getUsername():string{
        return this.lastName+" "+this.firstName;
    }

    public getDemonstrators():Array<Student>{
        return this.studentList;
    }

    public getId():number{
        return this.UserID;
    }

}