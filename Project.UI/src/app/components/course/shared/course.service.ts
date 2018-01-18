import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Course } from "./course.model";
import {HttpService} from '../../../shared/';

@Injectable()
export class CourseService {
    constructor(private httpService: HttpService) { }
    
   async getAllCourses():Promise<any>{
       return await this.httpService.getAll("course/get");
   }

   async getCourseById(id:string):Promise<any>{
        return await this.httpService.getById(id,"course/getbyid");
   }

   async UpdateCourse(course:Course):Promise<any>{
       return await this.httpService.put(course,"course/update/"+course.CourseID);
   }

   async CreateCourse(course:Course):Promise<any>{
       return await this.httpService.post(course,"course/create");
   }

   async DeleteCourse(courseID:string):Promise<any>{
       return await this.httpService.delete("course/delete/"+courseID);
   }


	
}
