import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WavesModule, TableModule, InputsModule } from 'angular-bootstrap-md';
import {AuthGuard} from './gaurds/auth.guard';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { ChangepwComponent } from './components/changepw/changepw.component';
import { RoyalityComponent } from './pages/royality/royality.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthoritydashboardComponent } from './pages/authoritydashboard/authoritydashboard.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { AddpageComponent } from './pages/addpage/addpage.component';
import { AuthoritysidebarComponent } from './components/authoritysidebar/authoritysidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LandingComponent,
    SignupComponent,
    DashboardComponent,
    SidebarComponent,
    ForgotComponent,
    ChangepwComponent,
    RoyalityComponent,
    ProfileComponent,
    AuthoritydashboardComponent,
    UserTableComponent,
    AddpageComponent,
    AuthoritysidebarComponent,
  ],
  imports: [
    WavesModule,
    InputsModule,
    TableModule,
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      progressAnimation: "increasing",
      preventDuplicates: true
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard,{provide: JWT_OPTIONS, useValue: JWT_OPTIONS},JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
