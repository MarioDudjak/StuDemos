import { Component,OnInit } from '@angular/core';
import { LoginService } from '../shared';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'master-layout',
    templateUrl: 'master.layout.html',
    styleUrls: ['./master.layout.css',]
        
})

export class MasterLayout implements OnInit {
        subscription: Subscription;    
        isLogged:boolean = false;
        constructor(private loginService:LoginService) { 
            this.subscription = loginService.isLogged.subscribe((value) => {
                this.isLogged = value;});
        }
        
        ngOnInit(){
        
    }
       
    
}