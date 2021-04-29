import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { Signup } from '../../services/signup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private signupservice: SignupService,
    private router: Router) { }

  ngOnInit(): void {
  }
  usermodel=new Signup("","","","");
  errorMsg='';
  
  onSubmit()
  {
    console.log("HEllo");
    
    console.log(this.usermodel);
      this.signupservice.check(this.usermodel)
    .subscribe(
      data => {console.log("Success!!!",data);},
      error => {this.errorMsg=error.error;
                this.router.navigate(['/Sign-Up']);}
    )
  }

}
