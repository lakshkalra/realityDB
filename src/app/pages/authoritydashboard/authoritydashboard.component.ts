import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { TablechangeService } from '../../services/tablechange.service';


@Component({
  selector: 'app-authoritydashboard',
  templateUrl: './authoritydashboard.component.html',
  styleUrls: ['./authoritydashboard.component.scss']
})
export class AuthoritydashboardComponent implements OnInit {

  constructor(private router: Router,private appService: AppService,private fb: FormBuilder,private tc: TablechangeService) {}
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

  errorMsg="";

  changeuserForm = this.fb.group({
    isbn:['',[Validators.required,Validators.pattern("^[0-9]{12}$")]],
    sales:['',[Validators.pattern("^[0-9]*$")]],
    royality: ['',[Validators.pattern("^[0-9]*$")]],
    amount:['',[Validators.pattern("^[0-9]*$")]],
  });
  ngOnInit() {



  }
  onSubmit()
  {
    console.log(this.changeuserForm.value);
    
    this.tc.editinfo(this.changeuserForm.value)
    .subscribe(
      data => {console.log("Success!!!",data);
      this.router.navigate(['/authoritydashboard']);},
      error => {this.errorMsg=error.error;
        console.log(this.errorMsg);}
    )
  }


}
