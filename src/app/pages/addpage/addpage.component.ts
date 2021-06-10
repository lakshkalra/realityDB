import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import {FormBuilder,Validators} from '@angular/forms';
import { TablechangeService } from '../../services/tablechange.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-addpage',
  templateUrl: './addpage.component.html',
  styleUrls: ['./addpage.component.scss']
})
export class AddpageComponent implements OnInit {

  constructor(private appService: AppService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private tc: TablechangeService) {}
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
  enrolluserForm = this.fb.group({
    name: ['',Validators.required],
    email: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    book_name:['',Validators.required],
    isbn:['',[Validators.required,Validators.pattern("^[0-9]{12}$")]],
    sales:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
    royality: ['',[Validators.required,Validators.pattern("^[0-9]*$")]],
    amount:['',[Validators.required,Validators.pattern("^[0-9]*$")]]
  });
  ngOnInit(): void {
  }
  onSubmit()
  {
    console.log(this.enrolluserForm.value);
    
    this.tc.check(this.enrolluserForm.value)
    .subscribe(
      data => {
      this.toastr.success("Succesfully Added");
    },
      error => {this.errorMsg=error.error;
        console.log(this.errorMsg);}
    )
  }

}
