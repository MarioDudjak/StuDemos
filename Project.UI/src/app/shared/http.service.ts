import { Injectable } from "@angular/core";
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";

@Injectable()
export class HttpService {
	apiUrl = "http://localhost:50968/api/";
	accessToken:string;
	constructor(private http: Http) {
		this.accessToken=localStorage.getItem("access_token");
	 }
    
    getAll(route:string): Observable<any> {
        let query = this.apiUrl+route;
        let headers = new Headers({ "Content-Type": "application/json" , "Accept":"application/json", "Authorization": "Bearer "+this.accessToken});
		let options = new RequestOptions({ headers: headers });

		return this.http.get(query,options)
			.map((response: Response) => <any>response.json())
			.catch(this.handleError);
	}

	getById(id: string, route:string): Observable<any> {
        let query = this.apiUrl+route+"/"+id;
		let headers = new Headers({ "Content-Type": "application/json" , "Accept":"application/json", "Authorization": "Bearer "+this.accessToken});
		let options = new RequestOptions({ headers: headers });

		return this.http.get(query,options)
			.map((response: Response) => <any>response.json())
			.catch(this.handleError);
	}

	put(data: any, route:string): Observable<any> {
        let query = this.apiUrl+route;        
		let body = JSON.stringify(data);
		let headers = new Headers({ "Content-Type": "application/json" , "Accept":"application/json", "Authorization": "Bearer "+this.accessToken});
		let options = new RequestOptions({ headers: headers });

		return this.http.put(query, body, options)
			.map((response: Response) => <Response>response.json())
			.catch(this.handleError);
	}

	post(data: any, route:string): Observable<any> {
        let query = this.apiUrl+route;        
		let body = JSON.stringify(data);
		let headers = new Headers({ "Content-Type": "application/json" , "Accept":"application/json", "Authorization": "Bearer "+this.accessToken});
		let options = new RequestOptions({ headers: headers });
		
		return this.http.post(query, body, options)
			.map((response: Response) => <any>response.json())
			.catch(this.handleError);
	}

	delete(id: string, route:string): Observable<Response>	{
		let query = this.apiUrl+route;    
		let headers = new Headers({ "Content-Type": "application/json" , "Accept":"application/json", "Authorization": "Bearer "+this.accessToken});
		let options = new RequestOptions({ headers: headers });    
		
		return this.http.delete(query,options)
			.map(response => response.text() ? response.json() : response)
			.catch(this.handleError);
	}

	handleError(error: Response) {
        console.error(error);
		return Observable.throw(error.json().error || "Server error");
	}
}