import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private auth: LoginService,private router: Router) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.auth.logout();
    this.router.navigate(["/home"]);
    return false;
  }
}
