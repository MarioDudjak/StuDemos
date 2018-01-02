import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from "angular2-materialize";
import {StudentService} from './student/shared';
import {StudentApplyComponent} from './student';
import {StudentScheduleComponent} from './student';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule, 
        MaterializeModule        
    ],
    declarations: [
        StudentApplyComponent,
		StudentScheduleComponent
    ],
    exports: [
       StudentApplyComponent,
	   StudentScheduleComponent
    ],
    providers: [
       StudentService
    ]
})
export class ComponentsModule { }
