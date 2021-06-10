import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  passbool = false;
  errorMsg = "";
  successMsg="";
  constructor(private fb: FormBuilder, 
    private login: LoginService,
    private toastr: ToastrService,
    private router: Router) { }

  forgotuserForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    otp: ['', [Validators.required, Validators.pattern("^[0-9]{6}$")]],
    password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
    confirm: ['', Validators.required]
  });

  sendotp() {
    let email = { "email": "" }
    email.email = this.forgotuserForm.get('email').value;
    console.log(typeof (email));

    this.login.forgotemail(email)
      .subscribe(
        data => { 
        this.successMsg="OTP Sent Successfully";
      },
        error => { this.errorMsg = error.error; }
      )
  }

  confpass() {
    if (this.forgotuserForm.get('password').value == this.forgotuserForm.get('confirm').value) {
      this.passbool = true;
      return this.passbool;
    }
  }
  ngOnInit(): void {
  }
  onSubmit() {
    this.login.forgotpassword(this.forgotuserForm.value)
      .subscribe(
        data => {
          console.log("Success!!!", data);
      this.toastr.success("Password Changed Successfully");
          this.router.navigate(['/home']);
        },
        error => { this.errorMsg = error.error; }
      )
  }

}
