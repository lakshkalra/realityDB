import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: LoginService,private router:Router){}
  canActivate()
  {
    if(!this.auth.loggedIn()){
      // console.log(this.auth.loggedIn());
      return true;
    }
    else{
      console.log(this.auth.loggedIn());
      this.router.navigate(['/home']);
      return false;
    }
  }
  
}
