import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../shared';
import { LoginService } from '../../shared';

@Component({
    selector: 'app-login',
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    message: string;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private loginService: LoginService) { }

    ngOnInit() {
        // reset login status
        this.loginService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    async login() {
        this.loading = true;
        var response;
        try{
            await this.loginService.LoginUserAsync(this.model.username,this.model.password);
            this.loading = false;            
        }
        catch(e){
            this.loading = false;       
            this.loginService.currentMessage.subscribe(message=> this.message = message);               
        }         
 
    };

}