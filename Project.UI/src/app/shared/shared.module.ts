import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {ErrorService, HttpService,RegisterService,LoginService,AlertService} from './index';
import {AuthGuard} from './guards';
import {AlertComponent} from './directives';
@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule    
  ],
  exports:[
    BrowserModule,    
    FormsModule,
    HttpModule,
    AlertComponent,
  ],
  providers: [ErrorService,HttpService,LoginService,RegisterService,AuthGuard,AlertService],
})

export class SharedModule { }