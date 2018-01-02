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
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule, 
        MaterializeModule,
        RouterModule     
    ],
    declarations: [
        StudentApplyComponent,
		StudentScheduleComponent,
        AdminApplyListComponent,
        AdminProfessorListComponent,
        AdminSidebarComponent,
        AdminCourseListComponent
    ],
    exports: [
       StudentApplyComponent,
	   StudentScheduleComponent,
       AdminApplyListComponent,
       AdminProfessorListComponent,
       AdminSidebarComponent,
       AdminCourseListComponent
    ],
    providers: [
       StudentService
    ]
})
export class ComponentsModule { }
