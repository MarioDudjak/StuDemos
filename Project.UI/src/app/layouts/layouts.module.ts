import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { MasterLayout} from './master.layout';



@NgModule({
    imports: [
        RouterModule
    ],
    declarations: [
        MasterLayout
    ]
})
export class LayoutsModule {
}
