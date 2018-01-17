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
    public Student:User;

constructor(firstName:string,lastName:string,gradeAverage:number,numberOfApplyHours:number,applyStatus:number,selections:Selection[],student:User){
    this.FirstName=firstName;
    this.LastName=lastName;
    this.GradeAverage=gradeAverage;
    this.NumberOfApplyHours=numberOfApplyHours;
    this.ApplyStatus=applyStatus;
    this.Selections=selections;
    this.Student=student;
    }

}

export class Selection{
    public SelectionID:string;
    public Priority:number;
    public CourseGrade:number;
    public Course:Course;

constructor(priority:number,courseGrade:number,course:Course){
    this.Priority=priority;
    this.CourseGrade=courseGrade;
    this.Course=course;
    }   
}

