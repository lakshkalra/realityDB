import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Signup } from './signup';
import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  signupurl='localhost:8081/user/register';
  constructor(private http: HttpClient) { }
  check(signup: Signup)
  {
    return this.http.post<any>(this.signupurl, signup)
    .pipe(catchError(this.errorHandler))
  } 
  errorHandler(error: HttpErrorResponse)
  {
    return throwError(error);
  }


  }

