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
        //return localStorage.getItem("userId");
        return "259";
    }

    //Get this student id
    public async getStudentId() : Promise<string> {
        return localStorage.getItem("userId");
    }

    //Get professor details
    public async getDemoCoursesDetails() :Promise<Object[]> {
        return [ 
        {
            "demonstrationCode":"P106",
            "already-chosen":[
                {"date": "22.01.2018",
                "time": "11:00",
                "student": {"id":"studentID", "name":"Lucija Lucic"}
                }
            ]
        }
       ];
    }

    //Get this student details
    public async getStudentDetails() : Promise<Object> {
        let studentID= localStorage.getItem("userId");
        let student = await this.getStudentByIdAsync(studentID);
        let studentApply = await this.studentService.getStudentApply(studentID);
        let course = await this.courseService.getCourseById(studentApply["selections"][0]["courseID"]);
        this.courseID = studentApply["selections"][0]["courseID"];
        
        try{
            var courseTerm = await this.httpService.getById(studentID,"courseTerm/getbystudentid");
        }
        catch(e){
            console.log("Error");
        }

        return {"branch":student["branch"],
        "semester":course["semester"],
        "demonstrationCode":course["courseCode"],
        "already-chosen":[
            {"date":courseTerm["date"],
            "time":courseTerm["time"],
            "student":studentID}]
        };
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
        let response = await this.httpService.post(courseTerm,"courseTerm/create");
        return response;
    }

    public async getStudentByIdAsync(id:string):Promise<any>{
        return await this.httpService.getById(id,"accounts/user");
    }
    
}
