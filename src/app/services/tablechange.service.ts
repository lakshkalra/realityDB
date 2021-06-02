import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablechangeService {
  url='http://localhost:8081/auth/add';
  urlget='http://localhost:8081/auth/info';
  urledit='http://localhost:8081/auth/edit';
  authtoken: any;
  constructor(private http: HttpClient,public jwtHelper: JwtHelperService) { }
  check(tablechange)
  {
    this.LoadToken();
    let headers= new HttpHeaders({
      'Authorization':this.authtoken
    })
    return this.http.post<any>(this.url,tablechange,{headers: headers})
    .pipe(catchError(this.errorHandler))
  } 
  errorHandler(error: HttpErrorResponse)
  {
    return throwError(error);
  }

  gettinginfo()
  {
    this.LoadToken();
    let headers= new HttpHeaders({
      'Authorization':this.authtoken
    })
    return this.http.get<any>(this.urlget,{headers: headers})
    .pipe(catchError(this.errorHandler))
  } 

  editinfo(editdb)
  {
    this.LoadToken();
    let headers= new HttpHeaders({
      'Authorization':this.authtoken
    })
    return this.http.post<any>(this.urledit,editdb,{headers: headers})
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
