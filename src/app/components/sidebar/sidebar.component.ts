import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Router } from '@angular/router';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public auth: LoginService,private router: Router) { }
usertype:boolean;
user:any;
  ngOnInit(): void {
    if(this.auth.type=="User"){
      this.usertype=true;
    }        
    else if(this.auth.type=="Authority")
    {
      this.usertype=false;
    }
    this.auth.getProfile().subscribe(
      data=>{
        this.user=data;
      }
    )

  }


  onLogout(){
    this.auth.logout();
    this.router.navigate(["/home"]);
    return false;
  }
}
