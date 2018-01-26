import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Student } from "../../student/shared/student.model";
import { Professor } from "../../professor/shared/professor.model";
import { HttpService } from '../../../shared/';
import { parseString } from "xml2js";
import {StudentService} from '../../student/shared';
import {CourseService} from '../../course/shared';

@Injectable()
export class ScheduleService {
    private apiUrl = "http://localhost:50968/api/student";
    courseID:string;
    constructor(private httpService: HttpService, 
        private http:Http,
        private studentService:StudentService,
        private courseService:CourseService) { }
    
    //Get schedule data
    public async getSchedule(scheduleUrl:string) : Promise<Object> {
        let headers = new Headers({ 'Content-Type': 'application/xml' });
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('Access-Control-Allow-Methods', 'GET');
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });
        const response = await this.http.get(scheduleUrl, options).toPromise();
        let scheduleData:Object;
        parseString(response["_body"], function (err, result) {
            scheduleData = result;
        });
        return scheduleData["raspored"];
    }

    //Get professor id
    public async getProfessorId(): Promise<string> {
        let response = await this.studentService.getStudentByIdAsync(localStorage.getItem("userId"));
        return response["identificationNumber"];
    }

    //Get this student id
    public async getStudentId() : Promise<string> {
        return localStorage.getItem("userId");
    }

    //Get professor details
    public async getDemoCoursesDetails() :Promise<Object[]> {

        let profId = localStorage.getItem('userId');
        let courses = await this.courseService.getAllCourses();
        var response = [];
        var i=0;
        courses.forEach(async element => {
            response[i]=[];  
            response[i]["already-chosen"]=[];                                                                
            if(element["professors"] && element["professors"].includes(profId)){
                response[i]["demonstrationCode"]=element["courseCode"];
                if(element["studentsNames"]){
                    let studentIds = element["students"].split(",");
                    let students = element["studentsNames"].split(",");
                    studentIds.forEach(async element => {
                        var studentCourseTerms = await this.httpService.getById(element,"courseTerm/getbystudentid");  
                        var s=0;
                        var j=0;
                        if(studentCourseTerms){
                        studentCourseTerms.forEach(element => {
                            response[i]["already-chosen"][j]=[];                            
                            response[i]["already-chosen"][j]["date"]=element["date"];
                            response[i]["already-chosen"][j]["time"]=element["time"];   
                            response[i]["already-chosen"][j]["student"]={};                     
                            response[i]["already-chosen"][j]["student"]["id"]=element["studentID"];
                            response[i]["already-chosen"][j]["student"]["name"]=
                            j++;
                        }); 
                    }

                        s++;
                    });                     
                }
                i++;                
            }
        });
        return response; 
    }

    //Get this student details
    public async getStudentDetails() : Promise<Object> {
        var response = {"branch":"",
        "semester":"",
        "demonstrationCode":"",
        "already-chosen":[]
        }; 

        let studentID= localStorage.getItem("userId");
        let student = await this.getStudentByIdAsync(studentID);
        response["branch"]=student["branch"];
        let studentApply = await this.studentService.getStudentApply(studentID);
        let course = await this.courseService.getCourseById(studentApply["selections"][0]["courseID"]);
        response["semester"]=course["semester"];
        response["demonstrationCode"]=course["courseCode"];
        this.courseID = studentApply["selections"][0]["courseID"];
        response["already-chosen"]=[];
        try{
            var courseTerms= await this.httpService.getById(this.courseID,"courseTerm/getbycourseid");
            console.log(courseTerms);
            if(courseTerms){
                var i=0;
                courseTerms.forEach(element => {
                    response["already-chosen"][i]={};                                    
                    response["already-chosen"][i]["date"]=element["date"];
                    response["already-chosen"][i]["time"]=element["time"];
                    response["already-chosen"][i]["student"]=element["studentID"];
                    i++;
                });
            }
        }
        catch(e){
        }
        return response;
    }


    //Set student as demonstrator
    public async setMyDemoCourse(courseCode:string, courseDate:string, timeStart:string) {
        let courseTerm = {
            "courseCode":courseCode,
            "date":courseDate,
            "time":timeStart,
            "courseID":this.courseID,
            "studentID":localStorage.getItem("userId")
        }
        console.log(courseTerm);
        let response = await this.httpService.post(courseTerm,"courseTerm/create");
        console.log(response);
        return response;
    }

    public async getStudentByIdAsync(id:string):Promise<any>{
        return await this.httpService.getById(id,"accounts/user");
    }
    
}
