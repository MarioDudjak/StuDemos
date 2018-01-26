import { Component,OnInit } from '@angular/core';
import { LoginService } from '../shared';

@Component({
    selector: 'master-layout',
    templateUrl: 'master.layout.html',
    styleUrls: ['./master.layout.css',]
        
})

export class MasterLayout implements OnInit {
     
        isLogged:boolean = false;
        constructor(private loginService:LoginService) { }
        
        ngOnInit(){
        if(localStorage.getItem('userId')){
            this.isLogged = true;
        }
    }
        logout(){
            this.loginService.logout();
        }
    
}