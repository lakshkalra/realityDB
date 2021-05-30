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
  
  onSubmit()
  {
      this.loginservice.check(this.usermodel)
    .subscribe(
      data => {console.log("Success!!!",data);
      this.router.navigate(['/dashboard']);
      this.loginservice.storeUserData(data.token);
    },
      error => {this.errorMsg=error.error;}
    )
  }
}
