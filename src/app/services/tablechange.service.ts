import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablechangeService {
  url='http://localhost:8081/auth/add';
  urlget='http://localhost:8081/auth/info';
  urledit='http://localhost:8081/auth/edit';
  constructor(private http: HttpClient) { }
  check(tablechange)
  {
    return this.http.post<any>(this.url,tablechange)
    .pipe(catchError(this.errorHandler))
  } 
  errorHandler(error: HttpErrorResponse)
  {
    return throwError(error);
  }

  gettinginfo()
  {
    return this.http.get<any>(this.urlget)
    .pipe(catchError(this.errorHandler))
  } 

  editinfo(editdb)
  {
    return this.http.post<any>(this.url,editdb)
    .pipe(catchError(this.errorHandler))
  }
}
