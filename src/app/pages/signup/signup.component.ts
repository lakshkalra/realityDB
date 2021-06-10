import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { Signup } from '../../services/signup';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private signupservice: SignupService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }
  usermodel=new Signup("","","","");
  errorMsg='';
  
  onSubmit()
  {
    
    console.log(this.usermodel);
      this.signupservice.check(this.usermodel)
    .subscribe(
      data => {console.log("Success!!!",data);
      this.toastr.success("Succesfully Signed up");
    },
      error => {this.errorMsg=error.error;
                this.router.navigate(['/Sign-Up']);}
    )
  }

}
