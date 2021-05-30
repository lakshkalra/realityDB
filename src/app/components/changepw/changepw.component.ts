import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-changepw',
  templateUrl: './changepw.component.html',
  styleUrls: ['./changepw.component.scss']
})
export class ChangepwComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  changepasswordobject={
    email:"",
    previous_password:"",
    new_password:""
  };
  ngOnInit(): void {
    this.changepasswordobject.previous_password=this.changepwForm.get("previous_password").value;
    this.changepasswordobject.new_password=this.changepwForm.get("new_password").value;
    }

    onSubmit()
    {
  
    }

  changepwForm = this.fb.group({
    previous_password:['',[Validators.required]],
    new_password:['',[Validators.required]]
  });

}
