import { Injectable } from "@angular/core";
import {HttpService} from './http.service';
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import { URLSearchParams } from '@angular/http';
import {Router} from '@angular/router';

@Injectable()
export class LoginService {
    constructor(private http:Http,
        private httpService:HttpService,
        private router:Router) { }
   
    public async LoginUserAsync(username:string,password:string):Promise<string>{

        let query = "http://localhost:50968/oauth/token";       
        let body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);
        body.set('grant_type','password');
        let headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded" ,"Accept":"application/json"});
        let options = new RequestOptions({ headers: headers });
        var response;
        try{
            response = JSON.parse((await this.http.post(query, body, options).toPromise())["_body"]);
            localStorage.setItem('access_token', response["access_token"]);
            this.getUserData(username);     
            return response["access_token"];
        } catch (error) {
            console.log(error);
        }        
    }

    public async getUserData(username:string){
        let response = await this.httpService.getById(username,"accounts/user");
        localStorage.setItem('userName',response["userName"]);
        localStorage.setItem('userId',response["id"]);
        localStorage.setItem('userRole',response["roleName"]);
        this.redirectUser(response["roleName"]);
    }

    public logout(){
        localStorage.removeItem('access_token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
    }

    private redirectUser(roleName:string){
            switch(roleName){
                case "Student":
                    this.router.navigate(["/student/apply"]);
                    break;
                case "Professor":
                    this.router.navigate([""]);
                    break;
                case "Admin":
                    this.router.navigate(["/admin/apply/list"]);
                    break;
                default:
                    this.router.navigate(["/home"]);     
                    break;           
            }
    }
}