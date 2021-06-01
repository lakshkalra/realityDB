import { Component, OnInit } from '@angular/core';
import { TablechangeService } from 'src/app/services/tablechange.service';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  constructor(private tc: TablechangeService) { }
tabledata=[];
  ngOnInit(): void {
    this.tc.gettinginfo().subscribe(
      data=> {
        this.tabledata=data;  
      },
      error => {
          console.log("Error!",error);       
        }  
    )
  }
  
  }
