import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Student } from "./student.model";
import {HttpService} from '../../../shared/';
import { parseString } from "xml2js";

@Injectable()
export class StudentService {
    constructor(private httpService: HttpService, private http:Http) { }
    
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
        return {"branch":"DRC","semester":"3","demonstrationCode":"P301","already-chosen":[{"date":"10.01.2018.","time":"15:00","student":"st21"}]};
    }

    //Get this student id
    public async getId() : Promise<string> {
        return "st12";
    }

    //Set student as demonstrator
    public setMyDemoCourse(courseCode:string, courseDate:string, timeStart:string) {
        console.log(courseCode, courseDate, timeStart);
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


	
}
