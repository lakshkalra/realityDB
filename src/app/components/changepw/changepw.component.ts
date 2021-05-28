import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-changepw',
  templateUrl: './changepw.component.html',
  styleUrls: ['./changepw.component.scss']
})
export class ChangepwComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  changepwForm = this.fb.group({
    previous_password:['',[Validators.required]],
    new_password:['',[Validators.required]]
  });

}
