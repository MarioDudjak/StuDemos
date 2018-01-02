import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NoContentRoute} from './no-content.route';
import {HomeRoute} from './home';
import {StudentApplyRoute} from './student';
import {StudentScheduleRoute} from './student';
import {ComponentsModule} from '../components';
@NgModule({
    imports: [
        RouterModule,
        ComponentsModule
    ],
    declarations: [
        // public
        HomeRoute,
        StudentApplyRoute,
		StudentScheduleRoute,
        NoContentRoute
    ],
    exports: [
        NoContentRoute,
        HomeRoute,    
        StudentApplyRoute,
		StudentScheduleRoute		
    ]
})
export class RoutesModule { }
