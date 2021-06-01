import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: Object;
  errorMsg = "";

  constructor(private appService: AppService, private fb: FormBuilder, private auth: LoginService, private router: Router) { }

  closePopup() {
    document.getElementById('popup1').style.display = "none";
  }
  openPopup() {
    document.getElementById('popup1').style.display = "block";
  }

  getClasses() {
    const classes = {
      'pinned-sidebar': this.appService.getSidebarStat().isSidebarPinned,
      'toggeled-sidebar': this.appService.getSidebarStat().isSidebarToggeled
    }
    return classes;
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }

  changeprofileForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    contact: ['', [Validators.required]]
  });


  ngOnInit(): void {

    this.auth.getProfile().subscribe(
      data => {
        this.user = data.user;
      },
      error => {
        console.log("Error!", error);
      }
    )

    this.changeprofileForm.patchValue({
      name: 'John Doe',
      email: 'John@gmail.com',
      contact: '8851127547',
    })
  }
  onSubmit() {
    this.auth.changeinfouser(this.changeprofileForm.value)
      .subscribe(
        data => { console.log("Success!!!", data); },
        error => { this.errorMsg = error.error; }
      )
  }


}
