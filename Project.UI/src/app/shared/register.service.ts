import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {HttpService} from './http.service';


@Injectable()
export class RegisterService {
	constructor(private httpService: HttpService) { 

    }

    public async createStudentAsync(student:any):Promise<any>{
        student["RoleName"]="Student";
        let response= await this.httpService.post(student,"accounts/create");
        this.AssingUserToRole(response["id"],"Student");
        return response["id"];
        /* Primjer JSON-a za slanje
         {
            "Email": "mdudjak@etfos.hr",
            "Username": "mario",
            "FirstName": "Mario",
            "LastName": "Dudjak",
            "RoleName": "Student",
            "Password": "mario.123",
            "ConfirmPassword": "mario.123"
        } */
    }

    public async createAdminAsync(admin:any):Promise<any>{
        admin["RoleName"]="Admin";
        let response = await this.httpService.post(admin,"accounts/create");
        this.AssingUserToRole(response["id"],"Admin");
        return response["id"];
    }

    public async createProfessorAsync(professor:any):Promise<any>{
        professor["RoleName"]="Professor";
        let response= await this.httpService.post(professor,"accounts/create");
        this.AssingUserToRole(response["id"],"Professor");
        return response["id"];
    }

    public async AssingUserToRole(userId:string,role:string){
        await this.httpService.put(role,"user/id="+userId+"/roles");
    }
    
	
}