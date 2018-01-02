import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AppComponent } from './app.component';
import {MasterLayout} from './layouts';
import {NoContentRoute} from './routes';
import {HomeRoute} from './routes/home';
import {StudentApplyRoute} from './routes/student';
import {StudentScheduleRoute} from './routes/student';

  @NgModule({
    imports: [
      RouterModule.forRoot([
        {
            path: '',
            component: MasterLayout,
            data: {},
            children: [
                { path: 'main', component: HomeRoute },         
                { path: 'student/apply', component: StudentApplyRoute },
				{ path: 'student/schedule', component: StudentScheduleRoute }, 
                { path: '', redirectTo: '/main', pathMatch: 'full' },
                { path: '**', component: NoContentRoute }
            ]
        }
    ])
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule {}