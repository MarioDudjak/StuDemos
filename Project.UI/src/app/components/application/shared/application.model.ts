import {User} from '../../../shared';
import {Course} from '../../course/shared';

export class Apply {
    public ApplyID:string;
    public FirstName:string;
    public LastName:string;
    public GradeAverage:number;
    public NumberOfApplyHours:number;
    public ApplyStatus:number;
    public Selections:Selection[];
    public StudentID:string;

constructor(firstName:string,lastName:string,gradeAverage:number,numberOfApplyHours:number,applyStatus:number,selections:Selection[],studentID:string){
    this.FirstName=firstName;
    this.LastName=lastName;
    this.GradeAverage=gradeAverage;
    this.NumberOfApplyHours=numberOfApplyHours;
    this.ApplyStatus=applyStatus;
    this.Selections=selections;
    this.StudentID=studentID;
    }

}

export class Selection{
    public SelectionID:string;
    public Priority:number;
    public CourseGrade:number;
    public CourseID:string;
    public CourseName:string;

constructor(priority:number,courseGrade:number,courseID:string,courseName:string){
    this.Priority=priority;
    this.CourseGrade=courseGrade;
    this.CourseID=courseID;
    this.CourseName=courseName;
    }   
}

