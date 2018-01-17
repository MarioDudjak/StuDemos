import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Student } from "../../student/shared/student.model";
import { Professor } from "../../professor/shared/professor.model";
import { HttpService } from '../../../shared/';
import { parseString } from "xml2js";

@Injectable()
export class ScheduleService {
	private apiUrl = "http://localhost:50968/api/student";
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

    //Get professor id
    public async getProfessorId(): Promise<string> {
        return "259";
    }

    //Get this student details
    public async getStudentDetails() : Promise<Object> {
        return {"branch":"DRC","semester":"3","demonstrationCode":"P301","already-chosen":[{"date":"10.01.2018.","time":"15:00","student":"st21"}]};
    }

    //Get this student id
    public async getStudentId() : Promise<string> {
        return "st12";
    }

    //Set student as demonstrator
    public setMyDemoCourse(courseCode:string, courseDate:string, timeStart:string) {
        console.log(courseCode, courseDate, timeStart);
    }

    public async getStudentByIdAsync(id:string):Promise<any>{
        return await this.httpService.getById(id,"user/getById");
    }
    
}
