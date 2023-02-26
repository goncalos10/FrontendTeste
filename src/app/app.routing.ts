import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './_services/auth.guard';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {FuncionarioLayoutComponent} from './layouts/funcionario-layout/funcionario-layout.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { AdminLayoutGuard } from './layouts/admin-layout/admin-layout.guard';
import { FuncionarioLayoutGuard } from './layouts/funcionario-layout/funcionario-layout.guard';


// Routes to render outside Admin Dashboard Layout
const routes: Routes = [
     {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard, AdminLayoutGuard],
        children: [{
            path: '',
            loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
        }]
    }, {
        path: '',
        component: FuncionarioLayoutComponent,
        canActivate: [AuthGuard, FuncionarioLayoutGuard],
        children: [{
            path: '',
            loadChildren: './layouts/funcionario-layout/funcionario-layout.module#FuncionarioLayoutModule'
        }]
    }, {
        path: 'login',
        component: LoginComponent
    }, {
        path: 'register',
        component: RegisterComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: false
        })
    ],
    exports: [],
})
export class AppRoutingModule {
}
