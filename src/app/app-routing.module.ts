import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from '../app/pages/signup/signup.component';
import { ProfileComponent } from '../app/pages/profile/profile.component';
import { LoginComponent } from '../app/pages/login/login.component';
import { LandingComponent } from '../app/pages/landing/landing.component';
import {DashboardComponent} from '../app/pages/dashboard/dashboard.component';
import { AuthGuard } from './gaurds/auth.guard';
import { AuthoritydashboardComponent } from '../app/pages/authoritydashboard/authoritydashboard.component'
 

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
    component: DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'authdashboard',
    component: AuthoritydashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'myprofile',
    component: ProfileComponent,
    canActivate:[AuthGuard]
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
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
