import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Student } from "./student.model";
import {HttpService} from '../../../shared/';
import { parseString } from "xml2js";
import {CourseService} from '../../course/shared';

@Injectable()
export class StudentService {
    courseID:string;
    
    constructor(private httpService: HttpService, 
        private http:Http,
        private courseService:CourseService) 
        { }
    
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

    //Get this student details
    public async getStudentDetails() : Promise<Object> {
        let studentID= localStorage.getItem("userId");
        let student = await this.getStudentByIdAsync(studentID);
        let studentApply = await this.getStudentApply(studentID);
        let course = await this.courseService.getCourseById(studentApply["selections"][0]["courseID"]);
        this.courseID= studentApply["selections"][0]["courseID"];
        let courseTerm = await this.httpService.getById(studentID,"courseTerm/getbystudentid");

        return {"branch":student["branch"],
        "semester":course["semester"],
        "demonstrationCode":course["courseCode"],
        "already-chosen":[
            {"date":courseTerm["date"],
            "time":courseTerm["time"],
            "student":studentID}]
    };
    }

    //Get this student id
    public async getId() : Promise<string> {
        return localStorage.getItem("userId");
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

    public async createStudentAsync(student:Student):Promise<any>{
        return await this.httpService.post(student,"accounts/create");
    }

    public async getStudentByIdAsync(id:string):Promise<any>{
        return await this.httpService.getById(id,"accounts/user");
    }

    public async getStudentsAsync():Promise<any>{
        return await this.httpService.getAll("accounts/students");
    }

    public async getStudentApply(studentID:string):Promise<any>{
        return await this.httpService.getById(studentID,"apply/getbystudentid");

    }


	
}
