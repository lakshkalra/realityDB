import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  passbool=false;
  errorMsg="";
  constructor(private fb: FormBuilder,private login: LoginService,private router: Router) { }
  forgotemailForm = this.fb.group({
    email: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
  });

  forgotuserForm = this.fb.group({
    email: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    otp: ['',[Validators.required,Validators.pattern("^[0-9]{6}$")]],
    password: ['',[Validators.required,Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
    confirm: ['',Validators.required]
  });

  sendotp(){
    this.login.forgotemail(this.forgotuserForm.get('email').value)
    .subscribe(
      data => {console.log("Success!!!",data);},
      error => {this.errorMsg=error.error;}
    )
  }

  confpass()
  {
    if(this.forgotuserForm.get('password').value==this.forgotuserForm.get('confirm').value)
    {
      this.passbool=true;
     return this.passbool;
    }
  }
  ngOnInit(): void {
  }
  onSubmit()
  {
      this.login.check(this.forgotuserForm.value)
    .subscribe(
      data => {console.log("Success!!!",data);
      this.router.navigate(['/home']);},
      error => {this.errorMsg=error.error;}
    )
  }

}
