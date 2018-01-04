import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Student } from "./student.model";
import {HttpService} from '../../../shared/';
import { parseString } from "xml2js";

@Injectable()
export class StudentService {
	private apiUrl = "http://localhost:50968/api/student";
    constructor(private httpService: HttpService, private http:Http) { }
    
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

    public async getStudentDetails() : Promise<Object> {
        return {"branch":"DRC","semester":"3","demonstrationCode":"P301","already-chosen":[{"date":"10.01.2018.","time":"15:00","student":"st21"}]};
    }

    public async getId() : Promise<string> {
        return "st12";
    }

    public async createStudentAsync(student:Student):Promise<any>{
        return await this.httpService.post(student,"user/create");
    }

    public async getStudentByIdAsync(id:string):Promise<any>{
        return await this.httpService.getById(id,"user/getById");
    }

    public async getStudentsAsync():Promise<any>{
        return await this.httpService.getAll("user/get");
    }

    public async putStudentAsync(student:Student):Promise<any>{
        return await this.httpService.put(student,"user/put");
    }

    public async deleteStudentsAsync(id:string):Promise<any>{
        return await this.httpService.delete(id,"user/delete");
    }
	
}
