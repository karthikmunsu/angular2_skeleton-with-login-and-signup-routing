import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent,
        data: {
            title: 'Login Page'
        }
    },
    {
        path: 'home',
        component: HomepageComponent,
        data: {
            title: 'Home Page'
        }
    },
    {
        path: '**',
        component: LoginComponent
    }
];


@NgModule({
  imports: [
 RouterModule.forRoot(appRoutes, { useHash: false }),
        RouterModule.forChild(appRoutes),
  ],
exports: [
        RouterModule
    ],
  declarations: []
})
export class AppRoutingModule { }


