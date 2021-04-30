import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Login } from './login';
import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginurl='localhost:8081/user/login';
  constructor(private http: HttpClient) { }
  check(login: Login)
  {
    return this.http.post<any>(this.loginurl, login)
    .pipe(catchError(this.errorHandler))
  } 
  errorHandler(error: HttpErrorResponse)
  {
    return throwError(error);
  }
}
