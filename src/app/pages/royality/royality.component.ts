import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-royality',
  templateUrl: './royality.component.html',
  styleUrls: ['./royality.component.scss']
})
export class RoyalityComponent implements OnInit {

  constructor(private appService: AppService,private router: Router) { }
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
  ngOnInit(): void {
  }

}
