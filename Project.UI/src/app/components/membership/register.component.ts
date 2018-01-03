import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../../services/index';

@Component({
    selector: 'app-register',
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private alertService: AlertService) { }

    register() {
            }
}
