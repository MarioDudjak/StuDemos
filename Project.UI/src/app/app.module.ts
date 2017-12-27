import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { LayoutsModule } from './layouts';
import { RoutesModule } from './routes';

import { HomeComponent } from './home/home.component';
import { ComponentsModule } from './components';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    LayoutsModule,
    RoutesModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
