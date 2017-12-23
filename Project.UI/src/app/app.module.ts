import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

<<<<<<< HEAD
import {StudentModule} from './student/student.module';
import {SharedModule} from './shared/shared.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
=======
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
>>>>>>> 6226376a5b34e351f2c8f1d43e82f660028586b8
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
<<<<<<< HEAD
  bootstrap: [AppComponent, HomeComponent]
=======
  bootstrap: [
    AppComponent,
  ]
>>>>>>> 6226376a5b34e351f2c8f1d43e82f660028586b8
})
export class AppModule { }