import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private appService: AppService,private fb: FormBuilder) { }

  closePopup()
  {
    document.getElementById('popup1').style.display="none";
  }
  openPopup()
  {
    document.getElementById('popup1').style.display="block";
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
    name:['',[Validators.required]],
    email:['',[Validators.required]],
    phone: ['',[Validators.required]],
    password:['',[Validators.required]],
  });


  ngOnInit(): void {
      this.changeprofileForm.patchValue({
        name: 'John Doe',
        email: 'John@gmail.com',
        phone: '8851127547',
        password: 'Hello123'
    })
  }

}
