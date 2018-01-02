import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from "angular2-materialize";
import {StudentService} from './student/shared';
import {StudentApplyComponent} from './student';
import {AdminApplyListComponent, AdminProfessorListComponent} from './admin';
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
        AdminApplyListComponent,
        AdminSidebarComponent,
        AdminProfessorListComponent
    ],
    exports: [
       StudentApplyComponent,
       AdminApplyListComponent,
       AdminSidebarComponent,
       AdminProfessorListComponent
    ],
    providers: [
       StudentService
    ]
})
export class ComponentsModule { }
