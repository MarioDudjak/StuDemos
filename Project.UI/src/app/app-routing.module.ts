import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {MasterLayout} from './layouts';
import {NoContentRoute} from './routes';
import {HomeRoute} from './routes/home';
import {StudentApplyRoute} from './routes/student';
import {StudentScheduleRoute} from './routes/student';
import {ProfessorScheduleRoute} from './routes/professor';
import {AdminApplyListRoute, AdminProfessorListRoute,AdminCourseListRoute} from './routes/admin';
import {RegisterRoute,LoginRoute} from './routes/membership';
import {AuthGuard} from './shared/guards';
  @NgModule({
    imports: [
      RouterModule.forRoot([
        {
            path: '',
            component: MasterLayout,
            data: {},
            children: [
                { path: 'main', component: HomeRoute },
                { path: 'student/apply', component: StudentApplyRoute, canActivate: [AuthGuard]},
				{ path: 'student/schedule', component: StudentScheduleRoute, canActivate: [AuthGuard] },
				{ path: 'professor/schedule', component: ProfessorScheduleRoute, canActivate: [AuthGuard]},
                { path: 'admin/apply/list', component: AdminApplyListRoute, canActivate: [AuthGuard]},
                { path: 'admin/professor/list', component: AdminProfessorListRoute, canActivate: [AuthGuard]},     
                { path: 'admin/course/list', component: AdminCourseListRoute, canActivate: [AuthGuard]},
                { path: 'register', component: RegisterRoute },
                { path: 'login', component: LoginRoute },
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