import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import { Student } from "./student.model";
import {HttpService} from '../../../shared/';
@Injectable()
export class StudentService {
	private apiUrl = "http://localhost:50968/api/student";
    constructor(private httpService: HttpService) { }
    
    public MoQStudents = {
        //return new {name = 10}
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