import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-authoritysidebar',
  templateUrl: './authoritysidebar.component.html',
  styleUrls: ['./authoritysidebar.component.scss']
})
export class AuthoritysidebarComponent implements OnInit {

  constructor(public auth: LoginService,private router: Router) { }

  ngOnInit(): void {
  }
  onLogout(){
    this.auth.logout();
    this.router.navigate(["/home"]);
    return false;
  }

}
