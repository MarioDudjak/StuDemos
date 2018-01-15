import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Apply } from "./application.model";
import {HttpService} from '../../../shared/';

@Injectable()
export class ApplicationService {
    constructor(private httpService: HttpService) { }
    
   async getAllApplications():Promise<any>{
       await this.httpService.getAll("apply/get");
   }

   async getApplyById(id:string):Promise<any>{
        await this.httpService.getById(id,"apply/getbyid");
   }

   async UpdateApplication(apply:Apply):Promise<any>{
       await this.httpService.put(apply,"apply/update/"+apply.ApplyID);
   }

   async CreateApplication(apply:Apply):Promise<any>{
       await this.httpService.post(apply,"apply/create");
   }

   async DeleteCourse(courseID:string):Promise<any>{
       await this.httpService.delete("course/delete"+courseID);
   }


	
}