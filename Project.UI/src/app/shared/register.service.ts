import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {HttpService} from './http.service';
import {Router} from '@angular/router';

@Injectable()
export class RegisterService {
    constructor(private httpService: HttpService,
    private router:Router) { 

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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
        }
    }

    public async AssingUserToRole(userId:string,role:string){
        var roles=["Student"];
        let response = await this.httpService.put(roles,"accounts/user/"+userId+"/roles");
        console.log(response);
        this.router.navigate(["/login"]);
    }
    
	
}