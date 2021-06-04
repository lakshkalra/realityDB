import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  authtoken: any;
  paygeturl="http://localhost:8081/user/razorfundid";
  existpayurl="http://localhost:8081/user/razorpayout";

  constructor(private http: HttpClient,public jwtHelper: JwtHelperService) { }

  getPaymentinfo(){
    this.LoadToken();
    let headers= new HttpHeaders({
      'Authorization':this.authtoken
    });
    return  this.http.get<any>(this.paygeturl,{headers: headers})
    .pipe(catchError(this.errorHandler))
  }

  existing(paymentinfo)
  {
    this.LoadToken();
    let headers= new HttpHeaders({
      'Authorization':this.authtoken
    });
    headers.append('Authorization',this.authtoken);
    return this.http.post<any>(this.existpayurl, paymentinfo, {headers: headers})
    .pipe(catchError(this.errorHandler))
  }

  new(paymentnew)
  {
    this.LoadToken();
    let headers= new HttpHeaders({
      'Authorization':this.authtoken
    });
    headers.append('Authorization',this.authtoken);
    return this.http.post<any>(this.paygeturl, paymentnew, {headers: headers})
    .pipe(catchError(this.errorHandler))
  }


  loggedIn()
  {
    const token= localStorage.getItem('id_token');
    return this.jwtHelper.isTokenExpired(token);
  }

  errorHandler(error: HttpErrorResponse)
  {
    return throwError(error);
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
