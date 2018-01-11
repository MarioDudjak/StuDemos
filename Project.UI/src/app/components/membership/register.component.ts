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
    constructor(
        private router: Router,
        private alertService: AlertService,
        private registerService:RegisterService) { }

    async register() :Promise<void> {
        this.user=new User(this.model.email,this.model.username,this.model.firstName,this.model.lastName,"Student",this.model.password);
        await this.registerService.createStudentAsync(this.user);
       }
}
