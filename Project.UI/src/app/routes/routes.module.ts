import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NoContentRoute} from './no-content.route';
import {HomeRoute} from './home';
import {StudentApplyRoute} from './student';
import {StudentFormSubmittedRoute} from './student';
import {StudentScheduleRoute} from './student';
import {ProfessorScheduleRoute} from './professor';
import {ComponentsModule} from '../components';
import {AdminApplyListRoute, AdminProfessorListRoute, AdminCourseListRoute} from './admin';
import {RegisterRoute,LoginRoute} from './membership';

@NgModule({
    imports: [
        RouterModule,
        ComponentsModule
    ],
    declarations: [
        HomeRoute,
        StudentApplyRoute,
		StudentFormSubmittedRoute,
		StudentScheduleRoute,
		ProfessorScheduleRoute,
        AdminApplyListRoute,
        AdminProfessorListRoute,
        AdminCourseListRoute,
        RegisterRoute,
        LoginRoute,
        NoContentRoute
    ],
    exports: [
        NoContentRoute,
        HomeRoute,    
        StudentApplyRoute,
		StudentFormSubmittedRoute,
		StudentScheduleRoute,
		ProfessorScheduleRoute,
        AdminApplyListRoute,
        AdminProfessorListRoute,
        RegisterRoute,
        LoginRoute,
        AdminCourseListRoute
    ]
})
export class RoutesModule { }
