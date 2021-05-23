import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';


@Component({
  selector: 'app-authoritydashboard',
  templateUrl: './authoritydashboard.component.html',
  styleUrls: ['./authoritydashboard.component.scss']
})
export class AuthoritydashboardComponent implements OnInit {

  bookings="";
  totalPrice="";
  buses='';
  users="";


  constructor(private appService: AppService) {}
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

  ngOnInit() {



  }


}
