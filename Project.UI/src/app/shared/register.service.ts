import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {HttpService} from './http.service';
import {Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class RegisterService {
    private messageSource = new BehaviorSubject<any>("");    
    
    constructor(private httpService: HttpService,
    private router:Router) { 

    }
 
    currentMessage = this.messageSource.asObservable();
    
    changeMessage(message: any) {
        this.messageSource.next(message);
    }

    public async createStudentAsync(student:any):Promise<any>{
        student["RoleName"]="Student";
        try{
        let response= await this.httpService.post(student,"accounts/create");
        console.log(response);
        this.AssingUserToRole(response["id"],"Student");
        return response["id"];
        }
        catch(error){
            this.handleError(error);
        }
    }

    public async createAdminAsync(admin:any):Promise<any>{
        admin["roleName"]="Admin";
        try{
        let response = await this.httpService.post(admin,"accounts/create");
        this.AssingUserToRole(response["id"],"Admin");
        return response["id"];
        }
        catch(error){
            this.handleError(error);
        }
    }

    public async createProfessorAsync(professor:any):Promise<any>{
        professor["RoleName"]="Professor";
        try{
        let response= await this.httpService.post(professor,"accounts/create");
        this.AssingUserToRole(response["id"],"Professor");
        return response["id"];
        }
        catch(error){
            this.handleError(error);
        }
    }

    public async AssingUserToRole(userId:string,role:string){
        var roles=["Student"];
        let response = await this.httpService.put(roles,"accounts/user/"+userId+"/roles");
        console.log(response);
        this.router.navigate(["/login"]);
    }
    
    public handleError(error){
        var error_desc =JSON.parse(error["_body"]);
        this.changeMessage(error_desc["error_description"]);
		return error_desc["error_description"];
    }
	
}