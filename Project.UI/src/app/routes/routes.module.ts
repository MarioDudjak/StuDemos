import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NoContentRoute} from './no-content.route';
import {HomeRoute} from './home';
import {StudentApplyRoute} from './student';
import {StudentScheduleRoute} from './student';
import {ComponentsModule} from '../components';
import {AdminApplyListRoute} from './admin';
@NgModule({
    imports: [
        RouterModule,
        ComponentsModule
    ],
    declarations: [
        HomeRoute,
        StudentApplyRoute,
		StudentScheduleRoute,
        AdminApplyListRoute,
        NoContentRoute
    ],
    exports: [
        NoContentRoute,
        HomeRoute,    
        StudentApplyRoute,
		StudentScheduleRoute
        AdminApplyListRoute
    ]
})
export class RoutesModule { }
