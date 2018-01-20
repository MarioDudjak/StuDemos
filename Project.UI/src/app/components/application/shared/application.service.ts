import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Apply } from "./application.model";
import {HttpService} from '../../../shared/';

@Injectable()
export class ApplicationService {
    constructor(private httpService: HttpService) { }
    
   async getAllApplications():Promise<any>{
       return await this.httpService.getAll("apply/get");
   }

   async getApplyById(id:string):Promise<any>{
        return await this.httpService.getById(id,"apply/getbyid");
   }

   async UpdateApplication(apply:Apply):Promise<any>{
       return await this.httpService.put(apply,"apply/update/"+apply["applyID"]);
   }

   async CreateSelection(selection:any):Promise<any>{
       return await this.httpService.post(selection,"selection/create");
   }
   async CreateApplication(apply:Apply):Promise<any>{
       return await this.httpService.post(apply,"apply/create");
   }

   async DeleteApplication(applyID:string):Promise<any>{
       return await this.httpService.delete("apply/delete/"+applyID);
   }


	
}
