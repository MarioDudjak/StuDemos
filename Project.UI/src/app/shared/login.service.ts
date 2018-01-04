import { Injectable } from "@angular/core";
import {HttpService} from './http.service';
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";

@Injectable()
export class LoginService {
	constructor(private http:Http,private httpService:HttpService) { }
   
    public async LoginUserAsync(username:string,password:string):Promise<string>{

        let query = "http://localhost:50968/api/oauth/token";       
        let body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);
        body.set('grant_type','password');
        let headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded" ,"Accept":"application/json"});
		let options = new RequestOptions({ headers: headers });
		
        let response= await this.http.post(query, body, options);

        localStorage.setItem('access_token', response["access_token"]);
        this.redirectUser(response["id"]);        
        return response["access_token"];
    }

    public async redirectUser(userId:string){
        let response = await this.httpService.getById(userId,"accounts/user");
        localStorage.setItem('username',response["username"]);
        localStorage.setItem('userId',response["id"]);
        localStorage.setItem('userRole',response["RoleName"]);
    }
}