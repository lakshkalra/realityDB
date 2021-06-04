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


  ngOnInit(): void {
    var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}
  }


}

