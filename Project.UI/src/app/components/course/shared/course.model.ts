export class Course {
    public CourseID:string;
    public CourseCode:string;
    public Semester:string;
    public CourseName:string;
    public StudyLevel:string;
    public professors:string[];
    public students:string[];

constructor(courseName:string,semester:string){
    this.CourseName=courseName;
    this.Semester = semester;
}
    
}


