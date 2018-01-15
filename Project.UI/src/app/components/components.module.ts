import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from "angular2-materialize";
import {ScheduleService} from './schedule/shared';
import {ScheduleComponent} from './schedule';
import {StudentService} from './student/shared';
import {StudentApplyComponent} from './student';
import {StudentScheduleComponent} from './student';
import {StudentSidebarComponent} from './student/shared';
import {ProfessorService} from './professor/shared';
import {ProfessorScheduleComponent} from './professor';
import {ProfessorSidebarComponent} from './professor/shared';
import {AdminApplyListComponent,AdminProfessorListComponent,AdminCourseListComponent} from './admin';
import {AdminSidebarComponent} from './admin/shared';
import { RegisterComponent, LoginComponent } from './membership';
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
        ScheduleComponent,
        StudentApplyComponent,
		StudentScheduleComponent,
        StudentSidebarComponent,
        ProfessorScheduleComponent,
        ProfessorSidebarComponent,
        AdminApplyListComponent,
        AdminProfessorListComponent,
        AdminSidebarComponent,
        RegisterComponent,
        LoginComponent,
        AlertComponent,
        AdminCourseListComponent
    ],
    exports: [
       ScheduleComponent,
       StudentApplyComponent,
	   StudentScheduleComponent,
       StudentSidebarComponent,
       ProfessorScheduleComponent,
       ProfessorSidebarComponent,
       AdminApplyListComponent,
       AdminProfessorListComponent,
       AdminSidebarComponent,
       RegisterComponent,
       LoginComponent,
       AlertComponent,
       AdminCourseListComponent
    ],
    providers: [
       ScheduleService,
       StudentService,
       ProfessorService,
       AuthGuard,
       AlertService,
       AuthenticationService
    ]
})
export class ComponentsModule { }
