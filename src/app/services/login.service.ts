import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Login } from './login';
import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login_url='http://localhost:8081/user/login';
  forgot_url='';
  constructor(private http: HttpClient) { }
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
}
