import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Course } from "./course.model";
import {HttpService} from '../../../shared/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CourseService {

    private courseSource = new BehaviorSubject<any>("");
    currentCourse = this.courseSource.asObservable();

    constructor(private httpService: HttpService) { }
    
    changeCourse(course: any) {
        this.courseSource.next(course)
      }

   async getAllCourses():Promise<any>{
       return await this.httpService.getAll("course/get");
   }

   async getCourseById(id:string):Promise<any>{
        return await this.httpService.getById(id,"course/getbyid");
   }

   async UpdateCourse(courseID:any, course:any):Promise<any>{
       course.CourseID=courseID;
       return await this.httpService.put(course,"course/update/"+courseID);
   }

   async CreateCourse(course:Course):Promise<any>{
       return await this.httpService.post(course,"course/create");
   }

   async DeleteCourse(courseID:string):Promise<any>{
       return await this.httpService.delete("course/delete/"+courseID);
   }


	
}
