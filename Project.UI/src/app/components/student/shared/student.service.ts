import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import { Student } from "./student.model";

@Injectable()
export class StudentService {
	private apiUrl = "http://localhost:50968/api/student";
    constructor(private http: Http) { }
    
    public MoQStudents = {
        //return new {name = 10}
    }
	
}