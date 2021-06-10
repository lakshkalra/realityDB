import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: any;
  existingfund = [];
  sendamountdata = {
    amount: "",
    fund_id: "",
    mode: ""
  }
  errorMsg = "";
  addnew = {};

  constructor(private appService: AppService,
    private fb: FormBuilder,
    private paymentservice: PaymentService,
    private authservice: LoginService,
    private toastr: ToastrService,
    private router: Router) { }
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


    this.authservice.getProfile().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log("Error", error);
      }
    )

    this.amountbankForm.get('mode').setValue('NEFT');
    this.paymentservice.getPaymentinfo().subscribe(
      data => {
        data.forEach(element => {

          if (element.account_type == "bank_account") {
            element.bank_account["fund_id"] = element.id;
            element.bank_account["account_type"] = "bank_account";
            this.existingfund.push(element.bank_account);
          }
          else {
            element.vpa["fund_id"] = element.id;
            element.vpa["account_type"] = "vpa";
            this.existingfund.push(element.vpa);
          }

        });


      },
      error => {
        console.log("Error", error);

      }
    )

  }
  amountbankForm = this.fb.group({
    amount: ['', [Validators.required]],
    mode: ['', [Validators.required]]
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
  SendingFundid(fund_id, amount, mode) {

    this.sendamountdata.fund_id = fund_id;
    this.sendamountdata.amount = amount;
    this.sendamountdata.mode = mode;
    // console.log(this.sendamountdata);

    this.paymentservice.existing(this.sendamountdata).subscribe(
      data => {
<<<<<<< HEAD
      this.toastr.success("Money Added Successfully");
      window.location.reload();
=======
        this.toastr.success("Money Added Successfully");
>>>>>>> 8531ff5a98e2bed7763ee79a74400aae94c0c39c
      },
      error => {
        this.errorMsg=error.error;
      }
    )

  }

  SendingFundidupi(fund_id, amount) {
    this.sendamountdata.fund_id = fund_id;
    this.sendamountdata.amount = amount;
    this.sendamountdata.mode = "UPI";
    this.paymentservice.existing(this.sendamountdata).subscribe(
      data => {
<<<<<<< HEAD
      this.toastr.success("Money Added Successfully");
      window.location.reload();
=======
        this.toastr.success("Money Added Successfully");
>>>>>>> 8531ff5a98e2bed7763ee79a74400aae94c0c39c
      },
      error => {
        this.errorMsg = error.error;
        console.log(error.error)
      }
    )
  }


  onBankaccount() {
    this.addnew = this.addnewbankaccount.value;
    this.addnew["account_type"] = "bank_account";
    this.paymentservice.new(this.addnew).subscribe(
      data => {
<<<<<<< HEAD
      this.toastr.success("Bank Account Added Successfully");
      window.location.reload();

=======
        this.router.navigate(['/dashboard']);
        this.toastr.success("Bank Account Added Successfully");
>>>>>>> 8531ff5a98e2bed7763ee79a74400aae94c0c39c
      },
      error => {
        this.errorMsg = error.error;
      }
    )
  }

  onUPIaccount() {
    this.addnew = this.addnewupiaccount.value;
    this.addnew["account_type"] = "vpa";
    this.paymentservice.new(this.addnew).subscribe(
      data => {
<<<<<<< HEAD
      this.toastr.success("UPI Account Added Successfully");
      window.location.reload();
=======
        this.router.navigate(['/dashboard']);
        this.toastr.success("UPI Account Added Successfully");
>>>>>>> 8531ff5a98e2bed7763ee79a74400aae94c0c39c
      },
      error => {
        this.errorMsg = error.error;
      }
    )
  }
}
