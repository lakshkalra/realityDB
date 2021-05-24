import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { TablechangeService } from 'src/app/services/tablechange.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  userTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  constructor(private fb: FormBuilder,private tc: TablechangeService) { }

  ngOnInit(): void {
    this.touchedRows = [];
    this.userTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.addRow();
    this.tc.gettinginfo().subscribe(
      data=> {
        console.log("Success!",data);},
      error => {
          console.log("Error!",error);       
        }  
    )
  }
  errorMsg='';
  
  ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      book_name: ['', [Validators.required]],
      isbn: ['', [Validators.required, Validators.minLength(12)]],
      sales: ['', [Validators.required]],
      royality: ['',Validators.required],
      amount: ['', [Validators.required]],
      withdrawal_amount: ['', [Validators.required]],
      isEditable: [true]
    });
  }

  addRow() {
    const control =  this.userTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control =  this.userTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
    console.log(this.userTable.value);
    this.tc.check(this.userTable.value)
    .subscribe(
      data => {console.log("Success!!!",data);
      },
      error => {this.errorMsg=error.error;}
    )
    
  }

  saveUserDetails() {
    console.log(this.userTable.value);
  }

  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.userTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    console.log(this.touchedRows);
  }
  toggleTheme() {
    this.mode = !this.mode;
  }

}
