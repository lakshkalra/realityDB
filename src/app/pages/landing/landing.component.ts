import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  constructor() { }
  closePopup()
  {
    document.getElementById('popup1').style.display="none";
  }
  openPopup()
  {
    document.getElementById('popup1').style.display="block";
  }

  ngOnInit(): void {

  }
}
