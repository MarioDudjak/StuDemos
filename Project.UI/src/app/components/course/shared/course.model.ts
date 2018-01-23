export class Course {
    public CourseID:string;
    public CourseCode:string;
    public Semester:string;
    public CourseName:string;
    public StudyLevel:string;
    public ProfessorsCodes:string;

constructor(courseName:string,semester:string,studyLevel:string,courseCode:string,professorsCodes:string){
    this.CourseName=courseName;
    this.Semester = semester;
    this.StudyLevel=studyLevel;
    this.CourseCode=courseCode;
    this.ProfessorsCodes=professorsCodes;
}


    
}


