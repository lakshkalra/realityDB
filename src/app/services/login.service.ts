import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Login } from './login';
import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authsidebar=true;
  authtoken: any;
  profileurl="http://localhost:8081/user/myprofile";
  login_url='http://localhost:8081/user/login';
  change_url='http://localhost:8081/user/changepass';
  forgot_url='';
  constructor(private http: HttpClient,public jwtHelper: JwtHelperService) { }
  check(login: Login)
  {
    return this.http.post<any>(this.login_url, login)
    .pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse)
  {
    return throwError(error);
  }

  forgotpassword(passwords)
  {
    return this.http.post<any>(this.forgot_url, passwords)
    .pipe(catchError(this.errorHandler))
  }

  storeUserData(token)
  {
    localStorage.setItem('id_token', token);
    this.authtoken=token;
  }

  getProfile(){
    let headers= new HttpHeaders();
    this.LoadToken();
    headers.append('Authorization',this.authtoken);
    return this.http.get<any>(this.profileurl,{headers: headers})
    .pipe(catchError(this.errorHandler))
  }

  changepassword(password)
  {
    let headers= new HttpHeaders();
    this.LoadToken();
    headers.append('Authorization',this.authtoken);
    return this.http.post<any>(this.change_url, password, {headers: headers})
    .pipe(catchError(this.errorHandler))
  }

  changeinfouser(information)
  {
    return this.http.post<any>(this.profileurl, information)
    .pipe(catchError(this.errorHandler))
  }

  loggedIn()
  {
    const token= localStorage.getItem('id_token');
    return this.jwtHelper.isTokenExpired(token);
  }

   LoadToken()
   {
     const token= localStorage.getItem('id_token');
     this.authtoken=token;
   }

  logout(){
  this.authtoken=null;
  localStorage.clear();
  }
}
