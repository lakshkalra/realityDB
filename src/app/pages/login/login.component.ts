import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Login } from '../../services/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginservice: LoginService,
    private router: Router) { }

  ngOnInit(): void {
  }
  usermodel=new Login("","");
  errorMsg='';
  usertype='';
  
  onSubmit()
  {
      this.loginservice.check(this.usermodel)
    .subscribe(
      data => {console.log("Success!!!",data);
      this.loginservice.storeUserData(data.token);
      this.usertype=data.user;
      if(this.usertype=="User"){
      this.router.navigate(['/dashboard']);
      console.log(this.usertype);
      }
      else if(this.usertype=="Authority"){
      this.router.navigate(['/authdashboard']);
      console.log(this.usertype);
      }
    },
      error => {
        // console.log(error.error.details[0].message);
        this.errorMsg=error.error;}
    )
  }
}
