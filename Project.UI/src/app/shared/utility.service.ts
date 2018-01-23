import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {HttpService} from './http.service';
import {Router} from '@angular/router';

@Injectable()
export class UtilityService {
    constructor(private httpService: HttpService,
    private router:Router) { 

    }

    public sortArray(array:Array<any>,key:string,asc:boolean){
        if(asc){
        return array.sort(function(a,b){
            return a[key].localeCompare(b[key]) 
            });  
        }
    else{
        return array.sort(function(a,b){
            return b[key].localeCompare(a[key]) 
            });  
        }      
    }


    
	
}