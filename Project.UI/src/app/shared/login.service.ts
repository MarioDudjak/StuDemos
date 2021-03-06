import { Injectable } from "@angular/core";
import {HttpService} from './http.service';
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import { URLSearchParams } from '@angular/http';
import {Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginService {
    private messageSource = new BehaviorSubject<any>("");    
    isLogged: Subject<boolean> = new Subject<boolean>();
    constructor(private http:Http,
        private httpService:HttpService,
        private router:Router) { }
   
        
    currentMessage = this.messageSource.asObservable();

    changeMessage(message: any) {
        this.messageSource.next(message);
    }
    
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
            this.isLogged.next(true);
            this.getUserData(username);     
            return response["access_token"];
        } catch (error) {
                this.handleError(error);        
            }        
    }

    public async getUserData(username:string){
        let response = await this.httpService.getById(username,"accounts/user");
        localStorage.setItem('userName',response["userName"]);
        localStorage.setItem('userId',response["id"]);
        localStorage.setItem('firstName',response["firstName"]);
        localStorage.setItem('lastName',response["lastName"]);
        localStorage.setItem('userRole',response["roleName"]);
        this.redirectUser(response["roleName"]);
    }

    public logout(){
        this.isLogged.next(false);        
        localStorage.removeItem('access_token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        this.router.navigate(["/login"]);
        
    }

    private async redirectUser(roleName:string){
            switch(roleName){
                case "Student":
                try{
                    let studentApply = await this.httpService.getById(localStorage.getItem('userId'),"apply/getbystudentid");
                    if(!studentApply){
                        this.router.navigate(["/student/apply"]);
                    }
                    if(studentApply["applyStatus"]!=1){
                        this.router.navigate(["/student/form/submitted"]);                        
                    }                   
                    else{
                        this.router.navigate(["/student/schedule"]);                        
                    }
                }
                catch(e){
                   this.router.navigate(["/student/apply"]);
                }
                    break;
                case "Professor":
                    this.router.navigate(["/professor/schedule"]);
                    break;
                case "Admin":
                    this.router.navigate(["/admin/apply/list"]);
                    break;
                default:
                    this.router.navigate(["/home"]);     
                    break;           
            }
    }
    handleError(error) {
        var error_desc =JSON.parse(error["_body"]);
        this.changeMessage(error_desc["error_description"]);
		return error_desc["error_description"];
	}
}