import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../shared';
import {User,RegisterService} from '../../shared';

@Component({
    selector: 'app-register',
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    user:User;
    message: string;


    constructor(
        private router: Router,
        private alertService: AlertService,
        private registerService:RegisterService) { }

    async register() :Promise<void> {
        this.loading = true;
        this.user=new User(this.model.email,this.model.username,this.model.firstName,this.model.lastName,"Student",this.model.password,
        this.model.studies,this.model.moduleName,this.model.year);
        try{
            await this.registerService.createStudentAsync(this.user);
            this.loading = false;
        }
        catch(e){
            this.loading = false;            
        }
        this.registerService.currentMessage.subscribe(message=> this.message = message);                    

    };
        

}
