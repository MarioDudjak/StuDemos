import { Injectable } from "@angular/core";
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
@Injectable()
export class HttpService {
	apiUrl = "http://localhost:50968/api/";
	accessToken:string;
	constructor(private http: Http) {
	 }
    
    async getAll(route:string): Promise<any> {
		this.accessToken=localStorage.getItem("access_token");		
        let query = this.apiUrl+route;
        let headers = new Headers({ "Authorization": "Bearer "+this.accessToken, "Content-Type": "application/json" , "Accept":"application/json"});
		let options = new RequestOptions({ headers: headers });

		try{
			let response = await this.http.get(query,options)
			.toPromise();
			return response.json();
			} catch (error) {
				this.handleError(error);
			}
	}

	async getById(id: string, route:string): Promise<any> {
		this.accessToken=localStorage.getItem("access_token");		
        let query = this.apiUrl+route+"/"+id;
		let headers = new Headers({ "Authorization": "Bearer "+this.accessToken, "Content-Type": "application/json" , "Accept":"application/json"});
		let options = new RequestOptions({ headers: headers });

		try{
			let response = await this.http.get(query,options)
			.toPromise();
			return response.json();
			} catch (error) {
				this.handleError(error);
			}
	}

	async put(data: any, route:string): Promise<any> {
		this.accessToken=localStorage.getItem("access_token");		
        let query = this.apiUrl+route;        
		let body = JSON.stringify(data);
		let headers = new Headers({"Authorization": "Bearer "+this.accessToken ,"Content-Type": "application/json" , "Accept":"application/json"});
		let options = new RequestOptions({ headers: headers });
		
		try{
		let response = await this.http.put(query, body, options)
		.toPromise();
		return response;
		} catch (error) {
			this.handleError(error);
		}
		
	}

	async post(data: any, route:string): Promise<any> {
		this.accessToken=localStorage.getItem("access_token");		
        let query = this.apiUrl+route;        
		let body = JSON.stringify(data);
		let headers = new Headers({  "Authorization": "Bearer "+this.accessToken, "Content-Type": "application/json" , "Accept":"application/json"});
		let options = new RequestOptions({ headers: headers });
		try{
		let response = await this.http.post(query, body, options)
		.toPromise();
		return response.json();
		} catch (error) {
			this.handleError(error);
		}
		
	}

	async delete(route:string): Promise<any>	{
		this.accessToken=localStorage.getItem("access_token");		
		let query = this.apiUrl+route;    
		let headers = new Headers({ "Authorization": "Bearer "+this.accessToken,"Content-Type": "application/json" , "Accept":"application/json"});
		let options = new RequestOptions({ headers: headers });    
		
		try{
			let response = await this.http.delete(query,options)
			.toPromise();
			return response.json();
			} catch (error) {
				this.handleError(error);
			}
	}

	handleError(error) {
		console.log(error);
	}
}