import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
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
import { DragableColumnDirective } from './dragable-column.directive';
import { UserTableComponent } from './components/user-table/user-table.component';
import { AddpageComponent } from './pages/addpage/addpage.component';

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
    DragableColumnDirective,
    UserTableComponent,
    AddpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
