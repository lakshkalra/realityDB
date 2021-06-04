import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {PaymentService} from '../../services/payment.service';
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  bookings="";
  totalPrice="";
  buses='';
  users="";
  existingfund=[];
  sendamountdata={
    amount:"",
    id:"",
    mode:""
  }

  addnew={};

  constructor(private appService: AppService, private fb: FormBuilder, private paymentservice: PaymentService) {}
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


  ngOnInit() {
    this.amountbankForm.get('mode').setValue('NEFT');
    this.paymentservice.getPaymentinfo().subscribe(
      data=>{
        data.forEach(element => {
          // console.log(element);
          
          if(element.account_type=="bank_account"){
            element.bank_account["id"]=element.id;
            element.bank_account["account_type"]="bank_account";
            this.existingfund.push(element.bank_account);
          }
          else{
            element.vpa["id"]=element.id;
            element.vpa["account_type"]="vpa";
            this.existingfund.push(element.vpa);
          }
          
        });
        console.log(this.existingfund);
        
      },
      error=>
      {
        console.log("Error",error);
        
      }
    )

  }
  amountbankForm = this.fb.group({
    amount: ['', [Validators.required]],
    mode:['',[Validators.required]]
  });

  amountupiForm = this.fb.group({
    amount: ['', [Validators.required]]
  });


  addnewbankaccount = this.fb.group({
    name: ['', [Validators.required]],
    ifsc: ['', [Validators.required]],
    account_number: ['', [Validators.required]]
  });

  addnewupiaccount = this.fb.group({
    address: ['', [Validators.required]],
  });
  SendingFundid(id,amount,mode){
    this.sendamountdata.id=id;
    this.sendamountdata.amount=amount;
    this.sendamountdata.mode=mode;
    this.paymentservice.existing(this.sendamountdata).subscribe(
      data=>{
        console.log("Success",data);
        },
      error=>{
        console.log("Error",error);
      }  
    )

  }
 
   SendingFundidupi(id,amount){
    this.sendamountdata.id=id;
    this.sendamountdata.amount=amount;
    this.sendamountdata.mode="UPI";
    this.paymentservice.existing(this.sendamountdata).subscribe(
      data=>{
        console.log("Success",data);
        },
      error=>{
        console.log("Error",error);
      }  
    )    
    }
 

  onBankaccount()
  {
    this.addnew=this.addnewbankaccount.value;
    this.addnew["account_type"]="bank_account";
    this.paymentservice.new(this.addnew).subscribe(
      data=>{
        console.log("Success",data);
        },
        error=>{
          console.log(Error,error);
          
        }
    )
  }

  onUPIaccount()
  {
    this.addnew=this.addnewupiaccount.value;
    this.addnew["account_type"]="vpa";
    this.paymentservice.new(this.addnew).subscribe(
      data=>{
        console.log("Success",data);
        },
        error=>{
          console.log(Error,error);
          
        }
    )
  }
}
