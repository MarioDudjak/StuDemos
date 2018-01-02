import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from "angular2-materialize";
import {StudentService} from './student/shared';
import {StudentApplyComponent} from './student';
import {StudentScheduleComponent} from './student';
import {AdminApplyListComponent} from './admin';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule, 
        MaterializeModule        
    ],
    declarations: [
        StudentApplyComponent,
		StudentScheduleComponent,
		AdminApplyListComponent
    ],
    exports: [
       StudentApplyComponent,
	   StudentScheduleComponent
       AdminApplyListComponent
    ],
    providers: [
       StudentService
    ]
})
export class ComponentsModule { }
