import { NgModule }              from '@angular/core';
import {StudentService} from './shared/student.service';
import {StudentRoutingModule} from './student-routing.module';
import {SharedModule} from './../shared/shared.module';

  @NgModule({
    imports: [
    SharedModule,
    StudentRoutingModule
    ],
    declarations:[],
    exports: [
      StudentRoutingModule
    ],
    providers:[StudentService]
  })
  export class StudentModule {}