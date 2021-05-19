import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from '../app/pages/signup/signup.component';
import { LoginComponent } from '../app/pages/login/login.component';
import { LandingComponent } from '../app/pages/landing/landing.component';
import {DashboardComponent} from '../app/pages/dashboard/dashboard.component';
 

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full' 
  },
  {
  path: 'home',
  component: LandingComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
