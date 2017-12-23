import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { MaterializeModule } from 'angular2-materialize';
import { FilterPipe } from '../pipes';
import {LayoutsModule} from './layouts';
import {RoutesModule} from './routes';
import {ComponentsModule} from './components';
@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    MaterializeModule,
    LayoutsModule,
    RoutesModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }