import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NoContentRoute} from './no-content.route';
import {HomeRoute} from './home';
import {StudentApplyRoute} from './student';
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
        NoContentRoute
    ],
    exports: [
        NoContentRoute,
        HomeRoute,    
        StudentApplyRoute    
    ]
})
export class RoutesModule { }
