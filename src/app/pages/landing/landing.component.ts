import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  constructor(private auth: LoginService) { }
  closePopup()
  {
    document.getElementById('popup1').style.display="none";
  }
  openPopup()
  {
    document.getElementById('popup1').style.display="block";
  }

  ngOnInit(): void {
    this.auth.logout();     
  }
}
