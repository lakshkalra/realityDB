import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-changepw',
  templateUrl: './changepw.component.html',
  styleUrls: ['./changepw.component.scss']
})
export class ChangepwComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: LoginService, private router: Router) { }
  ngOnInit(): void {
  }
  errorMsg = "";
  successMsg = "";

  onSubmit() {
    this.auth.changepassword(this.changepwForm.value)
      .subscribe(
        data => {
          console.log("Success!!!", data);
          this.successMsg = "Successfully updated";
        },
        error => { this.errorMsg = error.error; }
      )
  }

  changepwForm = this.fb.group({
    previous_password: ['', [Validators.required]],
    new_password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]]
  });

}
