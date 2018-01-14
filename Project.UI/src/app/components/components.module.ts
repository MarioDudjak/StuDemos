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
import {StudentSidebarComponent} from './student/shared';
import { RegisterComponent, LoginComponent } from './membership';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {CourseService} from './course/shared';
import {ApplicationService} from './application/shared';
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
        StudentSidebarComponent,
        RegisterComponent,
        LoginComponent,
        AdminCourseListComponent
    ],
    exports: [
       StudentApplyComponent,
	   StudentScheduleComponent,
       AdminApplyListComponent,
       AdminProfessorListComponent,
       AdminSidebarComponent,
       StudentSidebarComponent,
       RegisterComponent,
       LoginComponent,
       AdminCourseListComponent
    ],
    providers: [
       StudentService,
       CourseService,
       ApplicationService
    ]
})
export class ComponentsModule { }
