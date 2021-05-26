import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';


@Component({
  selector: 'app-authoritydashboard',
  templateUrl: './authoritydashboard.component.html',
  styleUrls: ['./authoritydashboard.component.scss']
})
export class AuthoritydashboardComponent implements OnInit {

  constructor(private appService: AppService,private fb: FormBuilder) {}
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

  changeuserForm = this.fb.group({
    isbn:['',[Validators.required,Validators.pattern("^[0-9]{12}$")]],
    sales:['',[Validators.pattern("^[0-9]*$")]],
    royality: ['',[Validators.pattern("^[0-9]*$")]],
    amount:['',[Validators.pattern("^[0-9]*$")]],
  });
  ngOnInit() {



  }


}
