import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from "angular2-materialize";
import {StudentService} from './student/shared';
import {StudentApplyComponent} from './student';
import {StudentScheduleComponent} from './student';
import {AdminApplyListComponent,AdminProfessorListComponent,AdminCourseListComponent} from './admin';
import {AdminSidebarComponent} from './admin/shared';
import { RegisterComponent } from './membership';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertComponent } from '../directives/index';
import { AuthGuard } from '../guards/index';
import { AlertService, AuthenticationService } from '../services/index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule, 
        MaterializeModule,
        RouterModule     
    ],
    declarations: [
        StudentApplyComponent,
		StudentScheduleComponent,
        AdminApplyListComponent,
        AdminProfessorListComponent,
        AdminSidebarComponent,
        RegisterComponent,
        AlertComponent,
        AdminCourseListComponent
    ],
    exports: [
       StudentApplyComponent,
	   StudentScheduleComponent,
       AdminApplyListComponent,
       AdminProfessorListComponent,
       AdminSidebarComponent,
       RegisterComponent,
       AlertComponent,
       AdminCourseListComponent
    ],
    providers: [
       StudentService,
       AuthGuard,
       AlertService,
       AuthenticationService
    ]
})
export class ComponentsModule { }
