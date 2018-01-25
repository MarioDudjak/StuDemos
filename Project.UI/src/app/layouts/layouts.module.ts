import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { MasterLayout} from './master.layout';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        MasterLayout
    ]
})
export class LayoutsModule {
}
